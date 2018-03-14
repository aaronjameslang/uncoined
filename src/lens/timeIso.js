/**
 * Time string formatted to ISO 8601
 *
 * [RFC 4122 § 4.1.4 Timestamp]{@link https://tools.ietf.org/html/rfc4122#section-4.1.4}
 * @module
 */

// TODO timeIso is a bad name, ISO != isomorphism

const timeLens = require('./time')

/**
 * @param {string} uuid
 * @returns {Array<number>}
 * @example <caption> Minimum </caption>
 * getTimeIso('00000000-0000-1000-b467-0ed5f89f718b')
 *      // => '1582-10-15T00:00:00.000000000Z'
 * @example <caption> Minimum + 1 tick </caption>
 * getTimeIso('00000001-0000-1000-b467-0ed5f89f718b')
 *      // => '1582-10-15T00:00:00.000000100Z'
 * @example <caption> Minimum + 1 second </caption>
 * getTimeIso('00989680-0000-1000-b467-0ed5f89f718b')
 *      // => '1582-10-15T00:00:01.000000000Z'
 * @example <caption> Minimum + 10 seconds </caption>
 * getTimeIso('05f5e100-0000-1000-b467-0ed5f89f718b')
 *      // => '1582-10-15T00:00:10.000000000Z'
 * @example <caption> Jan 1970 </caption>
 * getTimeIso('13814000-1dd2-11b2-b467-0ed5f89f718b')
 *      // => '1970-01-01T00:00:00.000000000Z'
 * @example <caption> March 2018 </caption>
 * getTimeIso('9d6316aa-2106-11e8-b467-0ed5f89f718b')
 *      // => '2018-03-06T06:21:32.883729000Z'
 * @example <caption> Maximum </caption>
 * getTimeIso('ffffffff-ffff0ffff-b467-0ed5f89f718b')
 *      // => '5236-03-31T21:21:00.684697500Z'
 * @static
 */
function getTimeIso (uuid) {
  const time = timeLens.get(uuid)
  const date = new Date(time[0] * 1000)
  const iso = date.toISOString()
  const nanoSeconds = String(time[1]).padStart(9, '0')
  const isoWithNanoseconds = iso.slice(0, -4) + nanoSeconds + 'Z'
  return isoWithNanoseconds
}

/**
 * @param {Array<number>}
 * @param {string} uuid
 * @returns {string} uuid
 * @example <caption> Minimum </caption>
 * setTimeIso('1582-10-15T00:00:00.000000000Z', '00000000-0000-1000-b467-0ed5f89f718b')
 *                                        // => '00000000-0000-1000-b467-0ed5f89f718b'
 * @example <caption> Minimum + 1 </caption>
 * setTimeIso('1582-10-15T00:00:00.000000100Z', '00000000-0000-1000-b467-0ed5f89f718b')
 *                                        // => '00000001-0000-1000-b467-0ed5f89f718b'
 * @example <caption> March 2018 </caption>
 * setTimeIso('2018-03-06T06:21:32.883729000Z', '00000000-0000-1000-b467-0ed5f89f718b')
 *                                        // => '9d6316aa-2106-11e8-b467-0ed5f89f718b'
 * @example <caption> Maximum </caption>
 * setTimeIso('5236-03-31T21:21:00.684697500Z', '00000000-0000-1000-b467-0ed5f89f718b')
 *                                        // => 'ffffffff-ffff-1fff-b467-0ed5f89f718b'
 * @static
 */
function setTimeIso (timeIso, uuid) {
  const date = new Date(timeIso)
  const seconds = Math.floor(date.getTime() / 1000)
  const nanoSeconds = Number(timeIso.slice(20, -1))
  const time = [seconds, nanoSeconds]
  return timeLens.set(time, uuid)
}

module.exports = {
  getTimeIso,
  setTimeIso
}
