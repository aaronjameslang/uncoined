/**
 * Lens on ticks as a 32 character hexadecimal string
 *
 * Re-ordered and concatenated from the three fields specified in
 * [RFC 4122 § 4.1.2 Layout and Byte Order]{@link https://tools.ietf.org/html/rfc4122#section-4.1.2}
 *
 * The first nyble will always be 0
 *
 * @param {string} uuid
 * @returns {string}
 * @example <caption> Zero </caption>
 * getTicks('00000000-0000-1000-b467-0ed5f89f718b')
 *        // => '0000000000000000'
 * @example <caption> ticks_low </caption>
 * getTicks('00000001-0000-1000-b467-0ed5f89f718b')
 *        // => '0000000000000001'
 * @example <caption> ticks_mid </caption>
 * getTicks('00000000-9999-1000-b467-0ed5f89f718b')
 *        // => '0000999900000000'
 * @example <caption> ticks_high </caption>
 * getTicks('00000000-0000-1234-b467-0ed5f89f718b')
 *        // => '0234000000000000'
 * @example <caption> Feb 2018 </caption>
 * getTicks('9d6316aa-2106-11e8-b467-0ed5f89f718b')
 *        // => '01e821069d6316aa'
 * @static
 */
function getTicks (uuid: Uuid): Ticks {
  return 0 +
    uuid.substr(0 + 8 + 1 + 4 + 1 + 1, 3) +
    uuid.substr(0 + 8 + 1, 4) +
    uuid.substr(0, 8)
}
export default getTicks
