import * as path from 'path'
const cwd = process.cwd()

export const resolvePath = (relativePath: string) => path.resolve(cwd, relativePath)

