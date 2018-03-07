/**
 * [RFC 4122 § 4.1.7 Nil UUID]{@link https://tools.ietf.org/html/rfc4122#section-4.1.7}
 * @module
 */

const NIL_UUID = '00000000-0000-0000-0000-000000000000'

/**
 * @param {string} uuid
 * @returns {boolean}
 * @example getNil('9d6316aa-2106-11e8-b467-0ed5f89f718b') // => false
 * @example getNil('00000000-0000-0000-0000-000000000000') // => true
 * @static
 */
function getNil (uuid) {
  return uuid === NIL_UUID
}

/**
 * @param {boolean} isNil
 * @param {string} uuid
 * @returns {string} uuid
 * @example
 * setNil(true,  '20c52f0b-8e8f-4ed1-c5d4-bc34595a6ef0')
 *         // => '00000000-0000-0000-0000-000000000000'
 * @example
 * setNil(false, '20c52f0b-8e8f-4ed1-c5d4-bc34595a6ef0')
 *         // => '20c52f0b-8e8f-4ed1-c5d4-bc34595a6ef0'
 * @example
 * getNil(setNil(false, '00000000-0000-0000-0000-000000000000')) // => false
 * @static
 */
function setNil (isNil, uuid) {
  if (isNil) return NIL_UUID
  if (!getNil(uuid)) return uuid
  return '00000000-0000-0000-e000-000000000000'
}

module.exports = {
  getNil,
  setNil
}
