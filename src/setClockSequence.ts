import getVariant from './getVariant'
import setVariant from './setVariant'
/**
 * [RFC 4122 § 4.1.5 Clock Sequence]{@link https://tools.ietf.org/html/rfc4122#section-4.1.5}
 * This is a lossy operation, as the clockSequence
 * will be truncated depending on the variant
 * @param {number} clockSequence Unsigned integer <= 0x7fff
 * @param {string} uuid
 * @returns {string} uuid
 * @example
 * setClockSequence(0xfedc,  '9d6316aa-2106-11e8-c467-0ed5f89f718b')
 *                     // => '9d6316aa-2106-11e8-dedc-0ed5f89f718b'
 * @example
 * setClockSequence(0x0123,  '9d6316aa-2106-11e8-b467-0ed5f89f718b')
 *                     // => '9d6316aa-2106-11e8-8123-0ed5f89f718b'
 * @static
 */
function setClockSequence (clockSequence: ClockSequence, uuid: Uuid) {
  const variant = getVariant(uuid)
  const clockSequenceHex = String(clockSequence.toString(16)).padStart(4, '0')
  const uuidWithSequence = uuid.substr(0, 19) + clockSequenceHex + uuid.substr(23)
  const uuidWithVariant = setVariant(variant, uuidWithSequence)
  return uuidWithVariant
}

export default setClockSequence
