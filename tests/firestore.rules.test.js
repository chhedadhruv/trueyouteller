// Runs against the Firestore emulator: yarn test:rules
import { after, before, beforeEach, describe, test } from 'node:test';
import { readFileSync } from 'node:fs';
import { assertFails, assertSucceeds, initializeTestEnvironment } from '@firebase/rules-unit-testing';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

let env;
let db;

const P = { IE: 40, SN: 60, TF: 55, JP: 30 };
const now = () => serverTimestamp();

before(async () => {
  env = await initializeTestEnvironment({
    projectId: 'demo-trueyouteller',
    firestore: { rules: readFileSync('firestore.rules', 'utf8'), host: '127.0.0.1', port: 8085 },
  });
});

beforeEach(async () => {
  await env.clearFirestore();
  db = env.unauthenticatedContext().firestore();
});

after(() => env.cleanup());

// Creates a parent doc bypassing rules, for subcollection tests.
const seed = (path, data) => env.withSecurityRulesDisabled((ctx) => setDoc(doc(ctx.firestore(), path), data));

describe('personalityTestResults', () => {
  const valid = () => ({
    name: 'Sam',
    personalityType: 'INFP',
    personalityName: 'The Mediator',
    answers: [1, 2, -1],
    percentages: P,
    questionVersion: 2,
    mode: 'classic',
    timestamp: now(),
    createdAt: new Date().toISOString(),
  });
  test('valid result can be created', () => assertSucceeds(setDoc(doc(db, 'personalityTestResults/r1'), valid())));
  test('bad type is rejected', () =>
    assertFails(setDoc(doc(db, 'personalityTestResults/r1'), { ...valid(), personalityType: 'XXXX' })));
  test('extra fields are rejected', () =>
    assertFails(setDoc(doc(db, 'personalityTestResults/r1'), { ...valid(), admin: true })));
  test('results cannot be read', async () => {
    await seed('personalityTestResults/r1', { name: 'Sam' });
    await assertFails(getDoc(doc(db, 'personalityTestResults/r1')));
  });
});

describe('mirrors', () => {
  const mirror = () => ({ ownerName: 'Sam', ownerType: 'INFP', ownerPercentages: P, createdAt: now() });
  test('create, then get by id', async () => {
    await assertSucceeds(setDoc(doc(db, 'mirrors/m1'), mirror()));
    await assertSucceeds(getDoc(doc(db, 'mirrors/m1')));
  });
  test('cannot list, update or delete', async () => {
    await seed('mirrors/m1', { ownerName: 'Sam' });
    await assertFails(getDocs(collection(db, 'mirrors')));
    await assertFails(updateDoc(doc(db, 'mirrors/m1'), { ownerName: 'Hacker' }));
    await assertFails(deleteDoc(doc(db, 'mirrors/m1')));
  });
  test('percentages out of range are rejected', () =>
    assertFails(setDoc(doc(db, 'mirrors/m1'), { ...mirror(), ownerPercentages: { ...P, IE: 900 } })));
  test('oversized name is rejected', () =>
    assertFails(setDoc(doc(db, 'mirrors/m1'), { ...mirror(), ownerName: 'x'.repeat(41) })));
  test('client-chosen createdAt is rejected', () =>
    assertFails(setDoc(doc(db, 'mirrors/m1'), { ...mirror(), createdAt: new Date(0) })));

  test('ratings: 16 answers accepted, listable by link holders', async () => {
    await seed('mirrors/m1', { ownerName: 'Sam' });
    await assertSucceeds(setDoc(doc(db, 'mirrors/m1/ratings/a'), { answers: Array(16).fill(1), createdAt: now() }));
    await assertSucceeds(getDocs(collection(db, 'mirrors/m1/ratings')));
  });
  test('ratings: wrong length, names, or missing parent rejected', async () => {
    await seed('mirrors/m1', { ownerName: 'Sam' });
    await assertFails(setDoc(doc(db, 'mirrors/m1/ratings/a'), { answers: Array(5).fill(1), createdAt: now() }));
    await assertFails(
      setDoc(doc(db, 'mirrors/m1/ratings/a'), { answers: Array(16).fill(1), name: 'Bob', createdAt: now() })
    );
    await assertFails(setDoc(doc(db, 'mirrors/nope/ratings/a'), { answers: Array(16).fill(1), createdAt: now() }));
  });
  test('ratings cannot be edited or deleted', async () => {
    await seed('mirrors/m1', { ownerName: 'Sam' });
    await seed('mirrors/m1/ratings/a', { answers: Array(16).fill(1) });
    await assertFails(updateDoc(doc(db, 'mirrors/m1/ratings/a'), { answers: Array(16).fill(-2) }));
    await assertFails(deleteDoc(doc(db, 'mirrors/m1/ratings/a')));
  });
});

describe('guesses', () => {
  test('create game and add a guess', async () => {
    await assertSucceeds(setDoc(doc(db, 'guesses/g1'), { ownerName: 'Sam', ownerType: 'INFP', createdAt: now() }));
    await assertSucceeds(setDoc(doc(db, 'guesses/g1/entries/e1'), { name: 'Bea', guess: 'ENFP', createdAt: now() }));
  });
  test('invalid guess is rejected', async () => {
    await seed('guesses/g1', { ownerName: 'Sam', ownerType: 'INFP' });
    await assertFails(setDoc(doc(db, 'guesses/g1/entries/e1'), { name: 'Bea', guess: 'nope', createdAt: now() }));
  });
});

describe('rooms', () => {
  test('create room and join', async () => {
    await assertSucceeds(setDoc(doc(db, 'rooms/r1'), { name: 'Family', emoji: '🏠', createdAt: now() }));
    await assertSucceeds(setDoc(doc(db, 'rooms/r1/members/m1'), { name: 'Ana', type: 'ESTJ', createdAt: now() }));
    await assertSucceeds(getDocs(collection(db, 'rooms/r1/members')));
  });
  test('cannot list rooms', () => assertFails(getDocs(collection(db, 'rooms'))));
});

describe('duos', () => {
  test('one partner only, at id "b"', async () => {
    await assertSucceeds(setDoc(doc(db, 'duos/d1'), { mode: 'couple', aName: 'Sam', aType: 'INFP', createdAt: now() }));
    await assertFails(setDoc(doc(db, 'duos/d1/partner/c'), { name: 'Bea', type: 'ENTJ', createdAt: now() }));
    await assertSucceeds(setDoc(doc(db, 'duos/d1/partner/b'), { name: 'Bea', type: 'ENTJ', createdAt: now() }));
    // A second write to "b" is an update, which is denied.
    await assertFails(setDoc(doc(db, 'duos/d1/partner/b'), { name: 'Eve', type: 'ISTJ', createdAt: now() }));
  });
  test('unknown mode is rejected', () =>
    assertFails(setDoc(doc(db, 'duos/d1'), { mode: 'rivals', aName: 'Sam', aType: 'INFP', createdAt: now() })));
});

describe('everything else', () => {
  test('unknown collections are closed', async () => {
    await assertFails(setDoc(doc(db, 'secrets/x'), { a: 1 }));
    await assertFails(getDoc(doc(db, 'secrets/x')));
  });
});
