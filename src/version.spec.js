const test = require('ava')
const libversion = require('./version')

/* isNil */

test('isNil true', t => {
  const actual = libversion.isNil('00000000-0000-0000-0000-000000000000')
  t.true(actual)
})

test('isNil false', t => {
  const actual = libversion.isNil('0f9b461f-9866-4874-b674-b848ff9b0092')
  t.false(actual)
})

test('readVariant 0 0000', t => {
  const actual = libversion.readVariant('0f9b461f-9866-4874-0674-b848ff9b0092')
  t.is(actual, 0)
})

/* readVariant */

test('readVariant 0 0111', t => {
  const actual = libversion.readVariant('0f9b461f-9866-4874-7674-b848ff9b0092')
  t.is(actual, 0)
})

test('readVariant 1 1000', t => {
  const actual = libversion.readVariant('0f9b461f-9866-4874-8674-b848ff9b0092')
  t.is(actual, 1)
})

test('readVariant 1 1011', t => {
  const actual = libversion.readVariant('0f9b461f-9866-4874-b674-b848ff9b0092')
  t.is(actual, 1)
})

test('readVariant 2 1101', t => {
  const actual = libversion.readVariant('0f9b461f-9866-4874-d674-b848ff9b0092')
  t.is(actual, 2)
})

test('readVariant 3 1111', t => {
  const actual = libversion.readVariant('0f9b461f-9866-4874-f674-b848ff9b0092')
  t.is(actual, 3)
})

/* readVersion */

test('readVersion 0', t => {
  const actual = libversion.readVersion('0f9b461f-9866-0874-8674-b848ff9b0092')
  t.is(actual, 0)
})

test('readVersion 1', t => {
  const actual = libversion.readVersion('0f9b461f-9866-1874-8674-b848ff9b0092')
  t.is(actual, 1)
})

test('readVersion 2', t => {
  const actual = libversion.readVersion('0f9b461f-9866-2874-8674-b848ff9b0092')
  t.is(actual, 2)
})

test('readVersion 3', t => {
  const actual = libversion.readVersion('0f9b461f-9866-3874-8674-b848ff9b0092')
  t.is(actual, 3)
})

test('readVersion 4', t => {
  const actual = libversion.readVersion('0f9b461f-9866-4874-8674-b848ff9b0092')
  t.is(actual, 4)
})

test('readVersion 5', t => {
  const actual = libversion.readVersion('0f9b461f-9866-5874-8674-b848ff9b0092')
  t.is(actual, 5)
})

test('readVersion 13', t => {
  const actual = libversion.readVersion('0f9b461f-9866-d874-8674-b848ff9b0092')
  t.is(actual, 13)
})
