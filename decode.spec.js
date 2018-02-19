import test from 'ava'

import decode from './decode'

const uuid4 = 'c8404eda-83cb-4728-bf68-21bd1bac26b8'

test('decode uuid4', t => {
  const actual = decode.fromRfc(uuid4)
  const expected = {
    variant: 1,
    version: 4
  }
  t.deepEqual(actual, expected)
})
