import test from 'ava'

import * as sut from './index'

test('coinable, die short', t => {
  const planchet = 'c8404eda-83cb-4728-bf68-21bd1bac26b8'
  const die = 'jane+doe'
  const actual = sut.coinable(die, planchet)
  t.true(actual)
})

test('coinable, die exact length', t => {
  const planchet = 'c8404eda-83cb-4728-bf68-21bd1bac26b8'
  const die = 'jane+doe+0123456789abc'
  const actual = sut.coinable(die, planchet)
  t.true(actual)
})

test('coinable, die too long', t => {
  const planchet = 'c8404eda-83cb-4728-bf68-21bd1bac26b8'
  const die = 'jane+doe+0123456789abcd'
  const actual = sut.coinable(die, planchet)
  t.false(actual)
})

test('coin', t => {
  const planchet = 'c8404eda-83cb-4728-bf68-21bd1bac26b8'
  // yEBO2oPLRyi/aCG9G6wmuA==
  const die = 'jane+doe'
  const actual = sut.coin(die, planchet)
  const expected = 'jane+doeRyi/aCG9G6wmuA=='
  t.is(actual, expected)
})

test('coinAll', t => {
  const planchet = 'c8404eda-83cb-4728-bf68-21bd1bac26b8'
  // yEBO2oPLRyi/aCG9G6wmuA==
  const die = 'jane+d'
  const actual = sut.coinAll(die, planchet)
  const expected = [
    'jane+dPLRyi/aCG9G6wmuA==',
    'yjane+dLRyi/aCG9G6wmuA==',
    'yEjane+dRyi/aCG9G6wmuA==',
    // 'yEBjane+dyi/aCG9G6wmuA==',
    // 'yEBOjane+di/aCG9G6wmuA==',
    // 'yEBO2jane+d/aCG9G6wmuA==',
    // 'yEBO2ojane+daCG9G6wmuA==',
    // 'yEBO2oPjane+dCG9G6wmuA==',
    // 'yEBO2oPLjane+dG9G6wmuA==',
    'yEBO2oPLRjane+d9G6wmuA==',
    // 'yEBO2oPLRyjane+dG6wmuA==',
    'yEBO2oPLRyijane+d6wmuA==',
    'yEBO2oPLRyi/jane+dwmuA==',
    'yEBO2oPLRyi/ajane+dmuA==',
    'yEBO2oPLRyi/aCjane+duA==',
    'yEBO2oPLRyi/aCGjane+dA==',
    'yEBO2oPLRyi/aCG9jane+d=='
  ]
  t.deepEqual(actual, expected)
})

test('coinAll, case flipping', t => {
  const planchet = 'c8404eda-83cb-4728-bf68-21bd1bac26b8'
  // yEBO2oPLRyi/aCG9G6wmuA==
  const die = 'jane+r'
  const actual = sut.coinAll(die, planchet)
  const expected = [
    'jane+rPLRyi/aCG9G6wmuA==',
    'yjane+rLRyi/aCG9G6wmuA==',
    'yEjane+rRyi/aCG9G6wmuA==',
    'yEBjane+Ryi/aCG9G6wmuA==', // case flip r -> R
    // 'yEBOjane+ri/aCG9G6wmuA==',
    // 'yEBO2jane+r/aCG9G6wmuA==',
    // 'yEBO2ojane+raCG9G6wmuA==',
    // 'yEBO2oPjane+rCG9G6wmuA==',
    // 'yEBO2oPLjane+rG9G6wmuA==',
    'yEBO2oPLRjane+r9G6wmuA==',
    // 'yEBO2oPLRyjane+rG6wmuA==',
    'yEBO2oPLRyijane+r6wmuA==',
    'yEBO2oPLRyi/jane+rwmuA==',
    'yEBO2oPLRyi/ajane+rmuA==',
    'yEBO2oPLRyi/aCjane+ruA==',
    'yEBO2oPLRyi/aCGjane+rA==',
    'yEBO2oPLRyi/aCG9jane+r=='
  ]
  t.deepEqual(actual, expected)
})

test('flipCharAt 8 abcdefghijkl', t => {
  const initial = 'abcdefghijkl'
  const expected = 'abcdefghIjkl'
  const actual = sut.flipCharAt(initial, 8)
  t.is(actual, expected)
})

test('flipCharAt 8 ABCDEFGHIJKL', t => {
  const initial = 'ABCDEFGHIJKL'
  const expected = 'ABCDEFGHiJKL'
  const actual = sut.flipCharAt(initial, 8)
  t.is(actual, expected)
})
