/**
 * [RFC 4122 § 4.1.4 Timestamp]{@link https://tools.ietf.org/html/rfc4122#section-4.1.4}
 * @module
 */

const bigInt = require('big-integer') // TODO remove this dependancy

/**
 * @param {string} uuid
 * @returns {number} Unsigned integer < 2^60 * 10^-7, i.e. 2^53 * 5^-7
 * @example <caption> Zero </caption>
 * getSeconds('00000000-0000-1000-b467-0ed5f89f718b') // => 0
 * @example <caption> 1 tick </caption>
 * getSeconds('00000001-0000-1000-b467-0ed5f89f718b') // => 0
 * @example <caption> 0.9999999 seconds </caption>
 * getSeconds('0098967f-0000-1000-b467-0ed5f89f718b') // => 0
 * @example <caption> 1 second </caption>
 * getSeconds('00989680-0000-1000-b467-0ed5f89f718b') // => 1
 * @example <caption> 1.0000001 seconds</caption>
 * getSeconds('00989681-0000-1000-b467-0ed5f89f718b') // => 1
 * @example <caption> 2 seconds </caption>
 * getSeconds('01312d00-0000-1000-b467-0ed5f89f718b') // => 2
 * @example <caption> 10 seconds </caption>
 * getSeconds('05f5e100-0000-1000-b467-0ed5f89f718b') // => 10
 * @example <caption> 10^32 ticks </caption>
 * getSeconds('00000000-0001-1000-b467-0ed5f89f718b') // => 429
 * @example <caption> 10^48 ticks </caption>
 * getSeconds('00000000-0000-1001-b467-0ed5f89f718b') // => 28147497
 * @example
 * getSeconds('9d6316aa-2106-11e8-b467-0ed5f89f718b') // => 13739610092
 * @example <caption> Max ticks </caption>
 * getSeconds('ffffffff-ffff-1ffff-b467-0ed5f89f718b') // => 115292150460
 * @static
 */
function getSeconds (uuid) {
  const hex = uuid.substr(14 + 1, 4 - 1) + uuid.substr(9, 4) + uuid.substr(0, 8)
  const bint = bigInt(hex, 16)
  const seconds = bint.divide(Math.pow(10, 7)).toJSNumber()
  return seconds
}

// /**
//  * @param {number} Unsigned integer < 10^9
//  * @param {string} uuid
//  * @returns {string} uuid
//  * @example
//  * setSeconds(0, '00000000-0000-1000-b467-0ed5f89f718b')
//  *             // => '00000000-0000-1000-b467-0ed5f89f718b'
//  * @example
//  * setSeconds(1, '00000000-0000-1000-b467-0ed5f89f718b')
//  *             // => '00000000-0000-1000-b467-0ed5f89f718b'
//  * @example
//  * setSeconds(99, '00000000-0000-1000-b467-0ed5f89f718b')
//  *              // => '00000000-0000-1000-b467-0ed5f89f718b'
//  * @example
//  * setSeconds(100, '00000000-0000-1000-b467-0ed5f89f718b')
//  *               // => '00000001-0000-1000-b467-0ed5f89f718b'
//  * @example
//  * setSeconds(1000, '00000000-0000-1000-b467-0ed5f89f718b')
//  *                // => '0000000a-0000-1000-b467-0ed5f89f718b'
//  * @example
//  * setSeconds(999999900, '00000000-0000-1000-b467-0ed5f89f718b')
//  *                     // => '0098967f-0000-1000-b467-0ed5f89f718b'
//  * @example
//  * setSeconds(999999999, '00000000-0000-1000-b467-0ed5f89f718b')
//  *                     // => '0098967f-0000-1000-b467-0ed5f89f718b'
//  * @example
//  * setSeconds(883729000, '9d6316aa-2106-11e8-b467-0ed5f89f718b')
//  *                     // => '9d6316aa-2106-11e8-b467-0ed5f89f718b'
//  * @example
//  * setSeconds(0, '9d6316aa-2106-11e8-b467-0ed5f89f718b')
//  *             // => '9cdc3e00-2106-11e8-b467-0ed5f89f718b'
//  * @example
//  * setSeconds(1300, '9d6316aa-2106-11e8-b467-0ed5f89f718b')
//  *                // => '9cdc3e0d-2106-11e8-b467-0ed5f89f718b'
//  * @static
//  */
// function setSeconds (seconds, uuid) {
//   const hex = uuid.substr(14 + 1, 4 - 1) + uuid.substr(9, 4) + uuid.substr(0, 8)
//   const bint = bigInt(hex, 16).times(100)
//   const bint_ = bint.divide(Math.pow(10, 9)).times(Math.pow(10, 9))
//   const bint__ = bint_.plus(seconds)
//   const hex_ = bint__.divide(100).toString(16).padStart(15, '0')
//   const uuid_ = hex_.substr(7, 8) + '-' + hex_.substr(3, 4) + '-' + uuid.charAt(14) + hex_.substr(0, 3) + uuid.substr(18)
//   return uuid_
// }

module.exports = {
  getSeconds
  // setSeconds
}
