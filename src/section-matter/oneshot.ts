import { getDataFromFile } from "../utils";
import * as sections from "section-matter";
import * as yaml from 'js-yaml';

export const getContent = (filePath: string) => {
  const data = getDataFromFile(filePath);
  return sections(data);
}

export const getContentWithYamlLoader = (filePath: string) => {
  const data = getDataFromFile(filePath)
  const params = sections<{ [key: string]: string }>(data, {
    parse: (section) => {
      section.key = 'section-' + section.key
      section.data = yaml.safeLoad(section.data)
    }
  })
  return params
}
