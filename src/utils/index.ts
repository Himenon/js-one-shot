import * as fs from 'fs'
import * as path from 'path'
const cwd = process.cwd()

export const resolvePath = (relativePath: string) => path.resolve(cwd, relativePath)
export const getDataFromFile = (filePath: string) => fs.readFileSync(resolvePath(filePath), 'utf8')
