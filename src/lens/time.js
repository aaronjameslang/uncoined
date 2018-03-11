/**
 * Time in the format `[unixTime, nanoseconds]`,
 *   where unixTime is seconds since 1970-01-01
 *
 * [RFC 4122 § 4.1.4 Timestamp]{@link https://tools.ietf.org/html/rfc4122#section-4.1.4}
 * @module
 */

const {getDuration, setDuration} = require('./duration')

const UNIX_TIME_1582_OCT_15 = -12219292800

/**
 * @param {string} uuid
 * @returns {Array<number>}
 * @example <caption> Minimum </caption>
 * getTime('00000000-0000-1000-b467-0ed5f89f718b') // => [-12219292800, 0]
 * @example <caption> Minimum + 1 tick </caption>
 * getTime('00000001-0000-1000-b467-0ed5f89f718b') // => [-12219292800, 100]
 * @example <caption> Minimum + 1 second </caption>
 * getTime('00989680-0000-1000-b467-0ed5f89f718b') // => [-12219292799, 0]
 * @example <caption> Minimum + 10 seconds </caption>
 * getTime('05f5e100-0000-1000-b467-0ed5f89f718b') // => [-12219292790, 0]
 * @example <caption> Feb 2018 </caption>
 * getTime('9d6316aa-2106-11e8-b467-0ed5f89f718b') // => [1520317292, 883729000]
 * @static
 */
function getTime (uuid) {
  const duration = getDuration(uuid)
  const time = [duration[0] + UNIX_TIME_1582_OCT_15, duration[1]]
  return time
}

/**
 * @param {Array<number>}
 * @param {string} uuid
 * @returns {string} uuid
 * @example
 * setTime([-12219292800, 0], '00000000-0000-1000-b467-0ed5f89f718b')
 *             // => '00000000-0000-1000-b467-0ed5f89f718b'
 * setTime([0, 0], '00000000-0000-1000-b467-0ed5f89f718b')
 *             // => '13814000-1dd2-11b2-b467-0ed5f89f718b'
 * @example
 * setTime([1, 0], '1419d680-1dd2-11b2-b467-0ed5f89f718b')
 *             // => '1419d680-1dd2-11b2-b467-0ed5f89f718b'
 * @example
 * setTime([10, 0], '1419d680-1dd2-11b2-b467-0ed5f89f718b')
 *               // => '19772100-1dd2-11b2-b467-0ed5f89f718b'
 * @example
 * setTime([1520317292, 883729000], '9d6316aa-2106-11e8-b467-0ed5f89f718b')
 *                   // => '9d6316aa-2106-11e8-b467-0ed5f89f718b'
 * @static
 */
function setTime (time, uuid) {
  return setDuration([time[0] - UNIX_TIME_1582_OCT_15, time[1]], uuid)
}

module.exports = {
  getTime,
  setTime
}
