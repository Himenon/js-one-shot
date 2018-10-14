import * as OneShot from "../oneshot";

test("parse", () => {
  const codeString = OneShot.parse(`
  function hello() {
    return "Hello World";
  }
  `);
  expect(codeString).not.toBeNull();
  const hello = new Function(`return ${codeString}`)();
  expect(hello()).toEqual("Hello World");
})
