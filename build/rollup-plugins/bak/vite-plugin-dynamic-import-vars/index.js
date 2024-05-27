import path, { isAbsolute, sep, extname } from 'node:path'
import { pathExistsSync } from 'fs-extra'
import { createFilter } from '@rollup/pluginutils'
import { asyncWalk } from 'estree-walker'
import MagicString from 'magic-string'
import fastGlob from 'fast-glob'
import { parseImportExpression } from './parseImportExpression'

const defaultExtensions = [
  'vue',
  'js',
  'cjs',
  'ts',
  'tsx',
  'jsx',
  'mjs',
  'mts',
  'mtsx'
]

export default function importDynamicModule({
  include = [],
  exclude = [],
  extensions = defaultExtensions
} = {}) {
  const filterRe = new RegExp(`\\.(?:${extensions.join('|')})$`)

  const filter = createFilter([filterRe, include].flat(), exclude)

  return {
    name: 'vite-plugin-dynamic-import',
    async transform(code, id) {
      if (!filter(id)) return null
      const parsed = this.parse(code)

      let ms
      let dynamicImportIndex = -1

      await asyncWalk(parsed, {
        enter: async node => {
          if (node.type !== 'ImportExpression') return
          dynamicImportIndex += 1
          const glob = parseImportExpression(node.source)
          if (!glob) return
          if (
            (glob.startsWith('./') || glob.startsWith('../')) &&
            extname(glob) !== ''
          )
            return
          const idDir = path.dirname(id)
          const cleanGlob = glob.replace(/\*/g, '').replace(/\\*/g, '')
          const libDir = path.resolve(idDir, cleanGlob)
          if (!pathExistsSync(libDir)) return
          const globExtensions = `.\{${extensions.join(',')}\}`
          const globalPattern = `./**/*${globExtensions}`
          const sources = fastGlob.sync(globalPattern, {
            cwd: libDir
          })
          ms = ms || new MagicString(code)

          ms.prepend(
            `function __variableDynamicImportRuntime${dynamicImportIndex}__(path) {
  switch (path) {
${sources
  .map(s => {
    const p = cleanGlob + sep + s
    return `    case '${p}': return import('${p}');`
  })
  .join('\n')}
${`    default: return new Promise(function(resolve, reject) {
      (typeof queueMicrotask === 'function' ? queueMicrotask : setTimeout)(
        reject.bind(null, new Error("Unknown variable dynamic import: " + path))
      );
    })\n`}   }
 }\n\n`
          )

          ms.overwrite(
            node.start,
            node.start + 6,
            `__variableDynamicImportRuntime${dynamicImportIndex}__`
          )
        }
      })
      if (ms) {
        return {
          code: ms.toString(),
          map: ms.generateMap({
            file: id,
            includeContent: true,
            hires: true
          })
        }
      }
      return null
    }
  }
}
