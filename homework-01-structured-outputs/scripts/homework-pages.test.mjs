import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import test from 'node:test';

const read = (path) => existsSync(path) ? readFileSync(path, 'utf8') : '';

test('homework routes have independent layout and accessible teaching content', () => {
  const page = read('src/pages/homework/1.astro');
  assert.match(page, /HomeworkLayout/, 'assignment must use independent layout');
  for (const id of ['concepts', 'lab', 'api', 'boundaries', 'evidence', 'references']) {
    assert.ok(page.includes(`id="${id}"`), `stable section ${id}`);
  }
  assert.match(page, /教学演示/);
  assert.match(page, /待补充/);
  assert.match(read('src/pages/homework/index.astro'), /href="\/homework\/1\/"/);
});

test('homework layout scopes its styles and provides full-navigation exits', () => {
  const layout = read('src/layouts/HomeworkLayout.astro');
  assert.match(layout, /class="homework-page"/);
  assert.match(layout, /data-no-swup/);
  assert.match(layout, /href="\/"/);
  assert.match(layout, /href="\/homework\/"/);
  assert.doesNotMatch(layout, /MainGridLayout|window\.onscroll/);
});

test('Swup ignores homework in both directions but retains blog navigation', () => {
  const source = read('astro.config.mjs');
  const match = source.match(/ignore: ([\s\S]*?),\r?\n\t\t\tcontainers:/);
  assert.ok(match, 'Swup needs a homework ignore callback');
  for (const [from, to, expected] of [
    ['/', '/homework/', true], ['/homework/1/', '/', true],
    ['/homework/1/', '/homework/', true], ['/homework/1/', '#lab', true],
    ['/homework', '/about/', true], ['/', '/homework-other/', false],
    ['/', '/about/', false], ['/about/', '/archive/', false],
  ]) {
    const location = { href: `https://example.test${from}`, pathname: from };
    const ignore = new Function('window', `return (${match[1]})`)({ location });
    assert.equal(ignore(to), expected, `${from} -> ${to}`);
  }
  assert.match(read('src/config.ts'), /url: "\/homework\/"/);
});
