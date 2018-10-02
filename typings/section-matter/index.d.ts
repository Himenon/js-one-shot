export interface Section<T> {
  key: string;
  data: T;
  content: string;
}

export interface Sections<T> {
  content: string;
  sections: Section<T>[];
}

export interface Options {
  parse?: (section: Section<string>, sections: Section<string>[]) => void;
}

declare module "section-matter" {
  function section<T = string>(input: string, options?: Options): Sections<T>
  // @ts-ignore
  export = section
}
