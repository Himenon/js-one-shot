import * as fs from 'fs'
import * as matter from 'gray-matter'
import { resolvePath } from '../utils'

export function getConfigDataFromMarkdown(filePath: string) {
  const raw = fs.readFileSync(resolvePath(filePath), 'utf8')
  const params = matter(raw)
  return params
}
