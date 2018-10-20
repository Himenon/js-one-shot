interface Parser {
  use: any
}
interface Options {}


declare function parse(options: Options): Parser;

export default parse;
