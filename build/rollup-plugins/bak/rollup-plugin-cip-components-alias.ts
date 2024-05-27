import { Plugin } from 'rollup'
import { asyncWalk } from 'estree-walker'
import MagicString from 'magic-string'
import { createFilter } from '@rollup/pluginutils'
import { isAbsolute } from 'path'
interface Options {
  include?: string[] | string
  exclude?: string[] | string
}
export default function cipComponentsAlias(options: Options = {}): Plugin {
  return {
    name: 'rollup-plugin-cip-components-alias',
    async resolveId(source, importer, options) {
      if (!isAbsolute(source)) {
        const resolver = await this.resolve(source, importer, {
          skipSelf: true,
          ...options
        })
        if (!resolver) return null
        // const dealId = source
        const dealId =
          resolver.id.replace(/\\/g, '/')
            .replace?.(/[\s\S]*cip\-components\/src/,'@xigefish/components')
            // .replace?.(/[\s\S]*d\-render\/src/, '@xigefish/d-render') ?? ''

        return dealId ? dealId.replace(/\.(vue|jsx)/, '.js') : null
      }
      return null
    },
    async transform(code, id) {
      const filter = createFilter(options.include, options.exclude)
      if (!filter(id)) return
      const parsed = this.parse(code)
      const str = new MagicString(code)
      await asyncWalk(parsed, {
        enter: async node => {
          if (node.type !== 'ImportDeclaration') return
          const _node = node as any
          const value = _node?.source?.value
          if (
            value &&
            value.startsWith('@xigefish/components') &&
            /\.vue$/.test(value)
          ) {
            str.overwrite(
              _node.source.start + 1,
              _node.source.end - 1,
              value.replace('.vue', '.js')
            )
          }
        }
      })
      return {
        code: str.toString(),
        map: str.generateMap({
          file: id,
          includeContent: true,
          hires: true
        })
      }
    }
  }
}
