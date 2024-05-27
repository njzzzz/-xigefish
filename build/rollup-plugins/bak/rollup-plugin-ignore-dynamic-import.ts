import type { Plugin } from 'rollup'
export default function ignoreDynamicImportPlugin(): Plugin {
  return {
    name: 'rollup-plugin-ignore-dynamic-import',
    resolveDynamicImport() {
      return false
    }
  }
}
