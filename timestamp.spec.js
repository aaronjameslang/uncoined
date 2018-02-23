import test from 'ava'

import {
  toTicks,
  toSeconds,
  toUnixTime,
  toNanoSeconds
} from './timestamp'

test('toTicks, zero', t => {
  t.is(toTicks(0, 0, 0), 0)
})

test('toTicks, one', t => {
  t.is(toTicks(0, 0, 1), 1)
})

test('toTicks, 2^53 - 1', t => {
  t.is(toTicks(0x1F, 0xFFFF, 0xFFFFFFFF) & 0xFF, 0xFF)
})

test('toTicks, 2^53', t => {
  t.is(toTicks(0x20, 0x0000, 0x00000000) & 0xFF, 0x00)
})

test('toTicks, 2^53 + 1', t => {
  // This is where precision fails
  t.is(toTicks(0x20, 0x0000, 0x00000001) & 0xFF, 0x00)
})

test('toSeconds, 0', t => {
  t.is(toSeconds(0, 0, 0), 0)
})

test('toSeconds, 0.9', t => {
  t.is(toSeconds(0, 0, 9999999), 0)
})

test('toSeconds, 1', t => {
  t.is(toSeconds(0, 0, 10000000), 1)
})

test('toSeconds, 1.1', t => {
  t.is(toSeconds(0, 0, 11000000), 1)
})

test('toSeconds, mid 1', t => {
  t.is(toSeconds(0, 1, 0), Math.floor(Math.pow(2, 25) / Math.pow(5, 7)))
  t.is(toSeconds(0, 1, 0), 429)
})

test('toSeconds, high 1', t => {
  t.is(toSeconds(1, 0, 0), Math.floor(Math.pow(2, 41) / Math.pow(5, 7)))
  t.is(toSeconds(1, 0, 0), 28147497)
})

test('toUnixTime, 0', t => {
  const actual = toUnixTime(0, 0, 0)
  const expected = Date.parse('00:00:00.00, 15 October 1582 Z') / 1000
  t.is(actual, expected)
})

test('toUnixTime, 0', t => {
  const unixTime = toUnixTime(0, 0, 0)
  const actual = (new Date(unixTime * 1000)).toISOString()
  const expected = '1582-10-15T00:00:00.000Z'
  t.is(actual, expected)
})

test('toUnixTime, 1', t => {
  const unixTime = toUnixTime(0, 0, 0)
  const actual = (new Date(unixTime * 1000)).toISOString()
  const expected = '1582-10-15T00:00:00.000Z'
  t.is(actual, expected)
})

test('toUnixTime, 1 millisecond', t => {
  const unixTime = toUnixTime(0, 0, 10000)
  const actual = (new Date(unixTime * 1000)).toISOString()
  const expected = '1582-10-15T00:00:00.000Z'
  t.is(actual, expected)
})

test('toUnixTime, 1 second', t => {
  const unixTime = toUnixTime(0, 0, 10000000)
  const actual = (new Date(unixTime * 1000)).toISOString()
  const expected = '1582-10-15T00:00:01.000Z'
  t.is(actual, expected)
})

test('toUnixTime, 2018 Feb 23', t => {
  const unixTime = toUnixTime(0x11e8, 0x183f, 0xe35ada64)
  const actual = (new Date(unixTime * 1000)).toISOString()
  const expected = '2018-02-23T02:18:51.000Z'
  t.is(actual, expected)
})

test('toNanoSeconds, 0', t => {
  const nanoSeconds = toNanoSeconds(0)
  t.is(nanoSeconds, 0)
})

test('toNanoSeconds, 1', t => {
  const nanoSeconds = toNanoSeconds(1)
  t.is(nanoSeconds, 100)
})

test('toNanoSeconds, 2018 Feb 23', t => {
  const unixTime = toUnixTime(0x11e8, 0x183f, 0xe35ada64)
  const nanoSeconds = toNanoSeconds(0xe35ada64)
  const milliseconds = (unixTime * 1000) + (nanoSeconds / 1000000)
  const actual = (new Date(milliseconds)).toISOString()
  const expected = '2018-02-23T02:18:51.438Z'
  t.is(actual, expected)
})
