import * as path from 'path';
import { getContent, getContentWithYamlLoader } from '../oneshot';

test('section-01.md', () => {
  const result = getContent(path.join(__dirname, './section-01.md'));
  expect(result).toEqual({
    sections: [
      {
        key: 'one',
        data: 'title: One',
        content: '\nThis is the first section.\n'
      }
    ],
    content: 'Content before the sections.\n\n---\n\nMore content.\n'
  });
});

test('section-02.md', () => {
  const result = getContent(path.join(__dirname, './section-02.md'));
  expect(result).toEqual({
    sections: [
      {
        key: 'one',
        data: 'title: First section',
        content: '\nThis is section one.\n'
      },
      {
        key: 'two',
        data: 'title: Second section',
        content: '\nThis is section two.\n'
      }
    ],
    content: 'This is content before the sections.\n'
  });
});

test('use yaml loader for section-01.md', () => {
  const result = getContentWithYamlLoader(
    path.join(__dirname, './section-01.md')
  );
  expect(result).toEqual({
    sections: [
      {
        key: 'section-one',
        data: {
          title: 'One'
        },
        content: '\nThis is the first section.\n'
      }
    ],
    content: 'Content before the sections.\n\n---\n\nMore content.\n'
  });
});

test('use yaml loader for section-02.md', () => {
  const result = getContentWithYamlLoader(
    path.join(__dirname, './section-02.md')
  );
  expect(result).toEqual({
    sections: [
      {
        key: 'section-one',
        data: { title: 'First section' },
        content: '\nThis is section one.\n'
      },
      {
        key: 'section-two',
        data: { title: 'Second section' },
        content: '\nThis is section two.\n'
      }
    ],
    content: 'This is content before the sections.\n'
  });
});
