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
    //'yEBO2oPLRyjane+dG6wmuA==',
    'yEBO2oPLRyijane+d6wmuA==',
    'yEBO2oPLRyi/jane+dwmuA==',
    'yEBO2oPLRyi/ajane+dmuA==',
    'yEBO2oPLRyi/aCjane+duA==',
    'yEBO2oPLRyi/aCGjane+dA==',
    'yEBO2oPLRyi/aCG9jane+d==',
  ]
  t.deepEqual(actual, expected)
})
