import test from 'ava'
import uv from 'uuid-validate'

test('foo', t => {
  t.truthy(uv('95ecc380-afe9-41e4-9b6c-751b66dd541e', 4))
})
