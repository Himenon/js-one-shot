import * as path from 'path'
import { getContent } from "../oneshot"

test('データを検証する', () => {
  const params = getContent(path.join(__dirname, './section-01.md'))
  expect(params).toEqual({
    sections: [
      {
        key: "one",
        data: "title: One",
        content: "\nThis is the first section.\n",
      }
    ],
    content: "Content before the sections.\n\n---\n\nMore content.\n"
  })
})
