export interface Section {
  key: string;
  data: string;
  content: string;
}

export interface Sections {
  content: string;
  sections: Section[];
}

export interface Options {
  parse?: (section: Section, sections: Section[]) => void;
}

declare module "section-matter" {
  function section(input: string, options?: Options): Sections
  // @ts-ignore
  export = section
}
