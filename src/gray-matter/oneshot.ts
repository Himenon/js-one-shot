import * as matter from 'gray-matter'
import { getDataFromFile } from '../utils'

export function getConfigDataFromMarkdown(filePath: string) {
  const raw = getDataFromFile(filePath)
  return matter(raw)
}
