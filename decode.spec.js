import test from 'ava'

import decode from './decode'

const uuidNil = '00000000-0000-0000-0000-000000000000'

const uuidV11A = '70008d18-15cc-11e8-b642-0ed5f89f718b'
const uuidV11B = '7000933a-15cc-11e8-b642-0ed5f89f718b'
const uuidV11C = '700094d4-15cc-11e8-b642-0ed5f89f718b'

const uuidV41 = 'c8404eda-83cb-4728-bf68-21bd1bac26b8'

test('decode uuidV41', t => {
  const actual = decode.fromRfc(uuidV41)
  const expected = {
    variant: 1,
    version: 4
  }
  t.deepEqual(actual, expected)
})
