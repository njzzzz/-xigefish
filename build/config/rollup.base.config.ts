// import { appendFile } from 'fs-extra'
import { defineConfig, ExternalOption, Plugin, ModuleSideEffectsOption } from 'rollup'

export function getRollupBaseConfig(
  input: string,
  format: 'esm' | 'cjs',
  output: string,
  plugins: Plugin[],
  external: ExternalOption,
  moduleSideEffects: ModuleSideEffectsOption = 'no-external',
) {
  return defineConfig({
    input,
    plugins,
    output: {
      format,
      file: output,
      exports: format === 'cjs' ? 'named' : undefined
    },
    treeshake: {
      moduleSideEffects: moduleSideEffects//'no-external'
    },
    external
    // onwarn(warn) {
    //   appendFile('./warning.txt', warn.message + '\r\n', err => {
    //     console.log(err)
    //   })
    // }
  })
}
