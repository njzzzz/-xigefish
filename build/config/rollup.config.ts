import fg from 'fast-glob'
import { getRollupBaseConfig } from './rollup.base.config'
import { buildDirResolve } from '../utils/path'
import { RollupOptions } from 'rollup'
import { join } from 'path'

type TGetRollupBaseConfig = typeof getRollupBaseConfig
interface IOpts {
  inputDir: string
  distEsmPath: string
  ignore: string[]
  plugins: Parameters<TGetRollupBaseConfig>['3']
  externals: Parameters<TGetRollupBaseConfig>['4'],
  moduleSideEffects?: Parameters<TGetRollupBaseConfig>['5']
}

export function getAllComponentDirs(inputDir: string, ignore: string[] = []) {
  return fg.sync(`${inputDir}/**/*.(jsx|js|mjs|vue|ts|tsx)`, {
    ignore
  })
}

export function getRollupOptions(
  files: string[],
  getConfig: TGetRollupBaseConfig,
  inputDir: string,
  distEsm: string,
  plugins: Parameters<TGetRollupBaseConfig>['3'],
  externals: Parameters<TGetRollupBaseConfig>['4'],
  moduleSideEffects?: Parameters<TGetRollupBaseConfig>['5']
) {
  return files.reduce((acc, input) => {
    const output = input.replace(inputDir, '').replace(/\.(jsx|vue|tsx|ts)/, '.js')
    // const output2 = input.replace(inputDir, '').replace(/\.(js(x)?|vue)/, '.min.js')
    acc.push(getConfig(
      input,
      'esm',
      join(buildDirResolve(distEsm), output),
      plugins,
      externals,
      moduleSideEffects
    ))
    return acc //[
      //...acc,

      // getConfig(
      //   input,
      //   'esm',
      //   join(buildDirResolve(distEsm), output2),
      //   [...plugins, terser()],
      //   externals,
      //   moduleSideEffects
      // ),
    //]
  }, [] as RollupOptions[])
}

export function build(opts: IOpts) {
  opts.inputDir = opts.inputDir.replace(/\\/g, '/');
  const components = getAllComponentDirs(opts.inputDir, opts.ignore)
  return getRollupOptions(
    components,
    getRollupBaseConfig,
    opts.inputDir,
    opts.distEsmPath,
    opts.plugins,
    opts.externals,
    opts.moduleSideEffects
  )
}
