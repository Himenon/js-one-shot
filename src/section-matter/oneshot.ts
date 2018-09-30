import { getDataFromFile } from "../utils";
import * as sections from "section-matter";

export const getContent = (filePath: string) => {
  const data = getDataFromFile(filePath);
  return sections(data);
}
