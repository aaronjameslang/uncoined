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
