import getVariant from './getVariant'
import decodeVariant1 from './decodeVariant1'

export const decodeVariant0 = (_uuid: Uuid): UuidVariant0 => ({
  variant: 0
})
export const decodeVariant2 = decodeVariant1
export const decodeVariant3 = (uuid: Uuid): UuidVariant3 => ({
  uuid,
  variant: 3
})

/**
 * @param {string} uuid
 * @return {object} record
 * @example
 * decode('9d6316aa-2106-11e8-b467-0ed5f89f718b')
 * // => {datetime: '2018-03-06T06:21:32.883729000Z', version: 1, variant: 1, clockSequence: 13415, node: '0ed5f89f718b'}
 */
const decode = (uuid: Uuid): UuidRecord => {
  const variant = getVariant(uuid)
  return [
    decodeVariant0,
    decodeVariant1,
    decodeVariant2,
    decodeVariant3
  ][variant](uuid)
}

export default decode
