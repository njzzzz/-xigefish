import { resolve } from 'node:path'
export const buildDirResolve = (p: string) => {
  return resolve(__dirname, '..', p)
}
