/**
 * [RFC 4122 § 4.1.4 Timestamp]{@link https://tools.ietf.org/html/rfc4122#section-4.1.4}
 * @module
 */

const bigInt = require('big-integer') // TODO remove this dependancy

/**
 * @param {string} uuid
 * @returns {number} Unsigned integer < 10^9
 * @example getNanoseconds('00000000-0000-1000-b467-0ed5f89f718b') // => 0
 * @example getNanoseconds('00000001-0000-1000-b467-0ed5f89f718b') // => 100
 * @example
 * getNanoseconds('0000000a-0000-1000-b467-0ed5f89f718b') // => 1000
 * @example
 * getNanoseconds('0000270f-0000-1000-b467-0ed5f89f718b') // => 999900
 * @example
 * getNanoseconds('00002710-0000-1000-b467-0ed5f89f718b') // => 1000000
 * @example
 * getNanoseconds('0098967f-0000-1000-b467-0ed5f89f718b') // => 999999900
 * @example
 * getNanoseconds('00989680-0000-1000-b467-0ed5f89f718b') // => 0
 * @example
 * getNanoseconds('00989681-0000-1000-b467-0ed5f89f718b') // => 100
 * @example <caption>10 seconds</caption>
 * getNanoseconds('05f5e100-0000-1000-b467-0ed5f89f718b') // => 0
 * @example
 * getNanoseconds('9d6316aa-2106-11e8-b467-0ed5f89f718b') // => 883729000
 * @static
 */
function getNanoseconds (uuid) {
  const hex = uuid.substr(14 + 1, 4 - 1) + uuid.substr(9, 4) + uuid.substr(0, 8)
  const bint = bigInt(hex, 16)
  const nanoseconds = bint.mod(Math.pow(10, 7)).times(100).toJSNumber()
  return nanoseconds
}

/*
 * a = 0x100000 % 1000
 * 576
 * b = 0x10000000 % 1000
 * 456
 * c = a
 * 576
 * c = (c * 16) % 1000
 * 216
 * c = (c * 16) % 1000
 * 456 // b
 */

/**
 * @param {number} Unsigned integer < 10^9
 * @param {string} uuid
 * @returns {string} uuid
 * @example
 * setNanoseconds(0, '00000000-0000-1000-b467-0ed5f89f718b')
 *             // => '00000000-0000-1000-b467-0ed5f89f718b'
 * @example
 * setNanoseconds(1, '00000000-0000-1000-b467-0ed5f89f718b')
 *             // => '00000000-0000-1000-b467-0ed5f89f718b'
 * @example
 * setNanoseconds(99, '00000000-0000-1000-b467-0ed5f89f718b')
 *              // => '00000000-0000-1000-b467-0ed5f89f718b'
 * @example
 * setNanoseconds(100, '00000000-0000-1000-b467-0ed5f89f718b')
 *               // => '00000001-0000-1000-b467-0ed5f89f718b'
 * @example
 * setNanoseconds(1000, '00000000-0000-1000-b467-0ed5f89f718b')
 *                // => '0000000a-0000-1000-b467-0ed5f89f718b'
 * @example
 * setNanoseconds(999999900, '00000000-0000-1000-b467-0ed5f89f718b')
 *                     // => '0098967f-0000-1000-b467-0ed5f89f718b'
 * @example
 * setNanoseconds(999999999, '00000000-0000-1000-b467-0ed5f89f718b')
 *                     // => '0098967f-0000-1000-b467-0ed5f89f718b'
 * @example
 * setNanoseconds(883729000, '9d6316aa-2106-11e8-b467-0ed5f89f718b')
 *                     // => '9d6316aa-2106-11e8-b467-0ed5f89f718b'
 * @example
 * setNanoseconds(0, '9d6316aa-2106-11e8-b467-0ed5f89f718b')
 *             // => '9cdc3e00-2106-11e8-b467-0ed5f89f718b'
 * @example
 * setNanoseconds(1300, '9d6316aa-2106-11e8-b467-0ed5f89f718b')
 *                // => '9cdc3e0d-2106-11e8-b467-0ed5f89f718b'
 * @static
 */
function setNanoseconds (nanoseconds, uuid) {
  const hex = uuid.substr(14 + 1, 4 - 1) + uuid.substr(9, 4) + uuid.substr(0, 8)
  const bint = bigInt(hex, 16).times(100)
  const bint_ = bint.divide(Math.pow(10, 9)).times(Math.pow(10, 9))
  const bint__ = bint_.plus(nanoseconds)
  const hex_ = bint__.divide(100).toString(16).padStart(15, '0')
  const uuid_ = hex_.substr(7, 8) + '-' + hex_.substr(3, 4) + '-' + uuid.charAt(14) + hex_.substr(0, 3) + uuid.substr(18)
  return uuid_
}

module.exports = {
  getNanoseconds,
  setNanoseconds
}
