import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildDuoReport } from './duoReport.js';
import { TYPE_CODES } from './compatibility.js';
import { roleFor, AVENGERS_TWIN, FRIENDS_TWIN } from './groupRoles.js';
import { TYPE_WORLD } from './typeWorld.js';
import { TYPE_PREVALENCE } from './typeRarity.js';

test('duo report has every section filled for all pairs and both modes', () => {
  for (const mode of ['couple', 'bestie']) {
    for (const a of TYPE_CODES) {
      for (const b of TYPE_CODES) {
        const report = buildDuoReport({ mode, a: { name: 'Ana', type: a }, b: { name: 'Ben', type: b } });
        assert.equal(report.sections.length, 5);
        for (const section of report.sections) {
          assert.ok(section.text && !section.text.includes('{') && !section.text.includes('undefined'), `${a}/${b} ${section.title}`);
        }
      }
    }
  }
});

test('every type has a role, twins, world content and rarity', () => {
  for (const code of TYPE_CODES) {
    assert.ok(roleFor(code), code);
    assert.ok(FRIENDS_TWIN[code] && AVENGERS_TWIN[code], code);
    assert.ok(TYPE_WORLD[code]?.watch.length === 3, code);
    assert.ok(TYPE_PREVALENCE[code] > 0, code);
  }
  const total = Object.values(TYPE_PREVALENCE).reduce((s, n) => s + n, 0);
  assert.ok(Math.abs(total - 100) < 1, `prevalence sums to ${total}`);
});
