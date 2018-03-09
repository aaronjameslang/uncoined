/**
 * Lens on time as a 32 character hexadecimal string
 *
 * Re-ordered and concatenated from the three fields specified in
 * [RFC 4122 § 4.1.2 Layout and Byte Order]{@link https://tools.ietf.org/html/rfc4122#section-4.1.2}
 *
 * The first nyble will always be 0
 *
 * @module
 */

/**
 * @param {string} uuid
 * @returns {string}
 * @example <caption> Zero </caption>
 * getTime('00000000-0000-1000-b467-0ed5f89f718b')
 *        // => '0000000000000000'
 * @example <caption> time_low </caption>
 * getTime('00000001-0000-1000-b467-0ed5f89f718b')
 *        // => '0000000000000001'
 * @example <caption> time_mid </caption>
 * getTime('00000000-9999-1000-b467-0ed5f89f718b')
 *        // => '0000999900000000'
 * @example <caption> time_high </caption>
 * getTime('00000000-0000-1234-b467-0ed5f89f718b')
 *        // => '0234000000000000'
 * @example <caption> Feb 2018 </caption>
 * getTime('9d6316aa-2106-11e8-b467-0ed5f89f718b')
 *        // => '01e821069d6316aa'
 * @static
 */
function getTime (uuid) {
  return 0 +
    uuid.substr(0 + 8 + 1 + 4 + 1 + 1, 3) +
    uuid.substr(0 + 8 + 1, 4) +
    uuid.substr(0, 8)
}

/**
 * @param {string} time
 * @param {string} uuid
 * @returns {string} uuid
 * @example <caption> Zero </caption>
 * setTime('0000000000000000', '00000000-0000-1000-b467-0ed5f89f718b')
 *                       // => '00000000-0000-1000-b467-0ed5f89f718b'
 * @example <caption> time_low </caption>
 * setTime('0000000011010101', '00000000-0000-1000-b467-0ed5f89f718b')
 *                       // => '11010101-0000-1000-b467-0ed5f89f718b'
 * @example <caption> time_mid </caption>
 * setTime('0000222200000000', '00000000-0000-1000-b467-0ed5f89f718b')
 *                       // => '00000000-2222-1000-b467-0ed5f89f718b'
 * @example <caption> time_high </caption>
 * setTime('abcd000000000000', '00000000-0000-1000-b467-0ed5f89f718b')
 *                       // => '00000000-0000-1bcd-b467-0ed5f89f718b'
 * @example <caption> Feb 2018 </caption>
 * setTime('01e821069d6316aa', '00000000-0000-1000-b467-0ed5f89f718b')
 *                       // => '9d6316aa-2106-11e8-b467-0ed5f89f718b'
 * @example <caption> Zero, into Feb 2018 </caption>
 * setTime('0000000000000000', '9d6316aa-2106-11e8-b467-0ed5f89f718b')
 *                       // => '00000000-0000-1000-b467-0ed5f89f718b'
 * @example <caption> Feb 2018, into self </caption>
 * setTime('01e821069d6316aa', '9d6316aa-2106-11e8-b467-0ed5f89f718b')
 *                       // => '9d6316aa-2106-11e8-b467-0ed5f89f718b'
 * @example <caption> Too short </caption>
 * setTime(           '12345', '00000000-0000-1000-b467-0ed5f89f718b')
 *                       // => '00012345-0000-1000-b467-0ed5f89f718b'
 * @static
 */
function setTime (time, uuid) {
  if (time.length > 16) throw new Error()
  time = time.padStart(16, '0')
  return '' +
    time.substr(8, 8) + '-' +
    time.substr(4, 4) + '-' +
    uuid.charAt(8 + 1 + 4 + 1) +
    time.substr(1, 3) + '-' +
    uuid.substr(8 + 1 + 4 + 1 + 4 + 1)
}

module.exports = {
  getTime,
  setTime
}
