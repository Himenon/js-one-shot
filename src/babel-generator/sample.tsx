// npx ts-node ./src/babel-generator/sample.tsx
const { parse } = require('@babel/parser');
const generate = require('@babel/generator').default;

const code = 'class Example {}';
const ast = parse(code);

const output = generate(
  ast,
  {
    /* options */
  },
  code,
);

console.log(output); // { code: 'class Example {}', map: null, rawMappings: null }
