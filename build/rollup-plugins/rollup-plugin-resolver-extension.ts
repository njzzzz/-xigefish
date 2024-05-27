import { sep } from 'node:path'
import { Plugin, PluginContext, ResolveIdHook } from 'rollup'
const mayBeSubFileExtension = ['index.js', 'index.jsx', 'index.vue'] as const
const mayBeFileExtension = ['.js', '.jsx', '.vue'] as const


async function findResolution(
  resolve: PluginContext['resolve'],
  mode: 'sep' | 'plus' = 'sep',
  source: string,
  importer: Parameters<ResolveIdHook>['1'],
  options: Parameters<ResolveIdHook>['2'],
  extensions: typeof mayBeFileExtension | typeof mayBeSubFileExtension
) {
  const sourceWithExt = extensions.map(ext =>
    mode === 'sep' ? source + sep + ext : source + ext
  )
  const allMayBeSource = sourceWithExt.map(p =>
    resolve(p, importer, {
      skipSelf: true,
      ...options
    })
  )
  const extResolutions = await Promise.all(allMayBeSource)
  const extResolution = extResolutions.find(res => !!res)
  return extResolution
}

export default function resolverExtension(): Plugin {
  return {
    name: 'rollup-plugin-resolver-extension',
    async resolveId(source, importer, options) {
      const resolution = await this.resolve(source, importer, {
        skipSelf: true,
        ...options
      })
      if (!resolution) {
        const resolutionExt = await findResolution(
          this.resolve,
          'plus',
          source,
          importer,
          options,
          mayBeFileExtension
        )
        if (resolutionExt) {
          return resolutionExt.id
        }
        const resolutionFileExt = await findResolution(
          this.resolve,
          'sep',
          source,
          importer,
          options,
          mayBeSubFileExtension
        )
        if (resolutionFileExt) {
          return resolutionFileExt.id
        }
      }
      return null
    }
  }
}
