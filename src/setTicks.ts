/**
 * Lens on ticks as a 32 character hexadecimal string
 *
 * Re-ordered and concatenated from the three fields specified in
 * [RFC 4122 § 4.1.2 Layout and Byte Order]{@link https://tools.ietf.org/html/rfc4122#section-4.1.2}
 *
 * The first nyble will always be 0
 *
 * @example <caption> Zero </caption>
 * setTicks('0000000000000000', '00000000-0000-1000-b467-0ed5f89f718b')
 *                       // => '00000000-0000-1000-b467-0ed5f89f718b'
 * @example <caption> ticks_low </caption>
 * setTicks('0000000011010101', '00000000-0000-1000-b467-0ed5f89f718b')
 *                       // => '11010101-0000-1000-b467-0ed5f89f718b'
 * @example <caption> ticks_mid </caption>
 * setTicks('0000222200000000', '00000000-0000-1000-b467-0ed5f89f718b')
 *                       // => '00000000-2222-1000-b467-0ed5f89f718b'
 * @example <caption> ticks_high </caption>
 * setTicks('abcd000000000000', '00000000-0000-1000-b467-0ed5f89f718b')
 *                       // => '00000000-0000-1bcd-b467-0ed5f89f718b'
 * @example <caption> Feb 2018 </caption>
 * setTicks('01e821069d6316aa', '00000000-0000-1000-b467-0ed5f89f718b')
 *                       // => '9d6316aa-2106-11e8-b467-0ed5f89f718b'
 * @example <caption> Zero, into Feb 2018 </caption>
 * setTicks('0000000000000000', '9d6316aa-2106-11e8-b467-0ed5f89f718b')
 *                       // => '00000000-0000-1000-b467-0ed5f89f718b'
 * @example <caption> Feb 2018, into self </caption>
 * setTicks('01e821069d6316aa', '9d6316aa-2106-11e8-b467-0ed5f89f718b')
 *                       // => '9d6316aa-2106-11e8-b467-0ed5f89f718b'
 * @example <caption> Too short </caption>
 * setTicks(           '12345', '00000000-0000-1000-b467-0ed5f89f718b')
 *                       // => '00012345-0000-1000-b467-0ed5f89f718b'
 * @static
 */
function setTicks (ticks, uuid) {
  if (ticks.length > 16) throw new Error()
  ticks = ticks.padStart(16, '0')
  return '' +
    ticks.substr(8, 8) + '-' +
    ticks.substr(4, 4) + '-' +
    uuid.charAt(8 + 1 + 4 + 1) +
    ticks.substr(1, 3) + '-' +
    uuid.substr(8 + 1 + 4 + 1 + 4 + 1)
}

module.exports = {
  getTicks,
  setTicks
}
