import getVariant from './getVariant'
/**
 * [RFC 4122 § 4.1.5 Clock Sequence]{@link https://tools.ietf.org/html/rfc4122#section-4.1.5}
 * @param {string} uuid
 * @returns {number} Unsigned integer <= 0x7fff
 * @example
 * getClockSequence('9d6316aa-2106-11e8-b467-0ed5f89f718b') // => 0x3467
 * @example
 * getClockSequence('9d6316aa-2106-11e8-9467-0ed5f89f718b') // => 0x1467
 * @example
 * getClockSequence('9d6316aa-2106-11e8-d467-0ed5f89f718b') // => 0x1467
 * @static
 */
function getClockSequence (uuid: Uuid): ClockSequence {
  const hex = uuid.substr(19, 4)
  const int = parseInt(hex, 16)
  const variant = getVariant(uuid)
  const mask = [0x7fff, 0x3fff, 0x1fff, 0x1fff][variant]
  const int$ = int & mask
  return int$
}

export default getClockSequence
