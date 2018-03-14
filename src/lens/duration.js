/**
 * Duration in the format `[seconds, nanoseconds]`
 *
 * Duration is distinct from `time` in that it is relative to an unspecified
 * point in time, whereas `time` is absolute.
 *
 * Similar to the value of [process.hrtime]{@link https://nodejs.org/api/process.html#process_process_hrtime_time}
 *
 * [RFC 4122 § 4.1.4 Timestamp]{@link https://tools.ietf.org/html/rfc4122#section-4.1.4}
 * @module
 */

const bigInt = require('big-integer') // TODO remove this dependancy
const { getTicks, setTicks } = require('./ticks')

const NANOSECONDS_PER_TICK = 100
const TICKS_PER_SECOND = Math.pow(10, 7)

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
  const ticksHexStr = getTicks(uuid)
  const ticksBigInt = bigInt(ticksHexStr, 16)
  const nanoseconds = ticksBigInt
    .mod(TICKS_PER_SECOND)
    .times(NANOSECONDS_PER_TICK)
    .toJSNumber()
  return nanoseconds
}

/*
 * Ideas for non-bigInt getNanos
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
 * @example <caption> Feb 2018 </caption>
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

function getDuration (uuid) {
  return [getSeconds(uuid), getNanoseconds(uuid)]
}

function setDuration (duration, uuid) {
  const ticksBigInt = bigInt(duration[0]).times(TICKS_PER_SECOND)
    .plus(Math.floor(duration[1] / NANOSECONDS_PER_TICK))
  const ticksHexStr = ticksBigInt.toString(16)
  return setTicks(ticksHexStr, uuid)
}

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
  return setDuration([getSeconds(uuid), nanoseconds], uuid)
}

/**
 * @param {number} Unsigned integer < 10^9
 * @param {string} uuid
 * @returns {string} uuid
 * @example
 * setSeconds(0, '00000000-0000-1000-b467-0ed5f89f718b')
 *             // => '00000000-0000-1000-b467-0ed5f89f718b'
 * @example
 * setSeconds(1, '00000000-0000-1000-b467-0ed5f89f718b')
 *             // => '00989680-0000-1000-b467-0ed5f89f718b'
 * @example
 * setSeconds(2, '00000000-0000-1000-b467-0ed5f89f718b')
 *              // => '01312d00-0000-1000-b467-0ed5f89f718b'
 * @example
 * setSeconds(10, '00000000-0000-1000-b467-0ed5f89f718b')
 *               // => '05f5e100-0000-1000-b467-0ed5f89f718b'
 * @example
 * setSeconds(13739610092, '9d6316aa-2106-11e8-b467-0ed5f89f718b')
 *                   // => '9d6316aa-2106-11e8-b467-0ed5f89f718b'
 * @example <caption> Zero, into Feb 2018 </caption>
 * setSeconds(0, '9d6316aa-2106-11e8-b467-0ed5f89f718b')
 *         // => '0086d8aa-0000-1000-b467-0ed5f89f718b'
 * @static
 */
function setSeconds (seconds, uuid) {
  return setDuration([seconds, getNanoseconds(uuid)], uuid)
}

module.exports = {
  getDuration,
  getNanoseconds,
  getSeconds,
  setDuration,
  setNanoseconds,
  setSeconds
}
