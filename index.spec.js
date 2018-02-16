import test from 'ava'

import * as sut from './index'

test('coinable, short string', t => {
  const planchet = 'c8404eda-83cb-4728-bf68-21bd1bac26b8'
  const die = 'jane+doe'
  const actual = sut.coinable(die, planchet)
  t.true(actual)
})
