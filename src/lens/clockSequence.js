/**
 * [RFC 4122 § 4.1.5 Clock Sequence]{@link https://tools.ietf.org/html/rfc4122#section-4.1.5}
 * @module
 */

const variantLens = require('./variant')

/**
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
function getClockSequence (uuid) {
  const hex = uuid.substr(19, 4)
  const int = Number.parseInt(hex, 16)
  const variant = variantLens.getVariant(uuid)
  const mask = [0x7fff, 0x3fff, 0x1fff, 0x1fff][variant]
  const int_ = int & mask
  return int_
}

/**
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
function setClockSequence (clockSequence, uuid) {
  const variant = variantLens.getVariant(uuid)
  const clockSequenceHex = clockSequence.toString(16).padStart(4, '0')
  const uuidWithSequence = uuid.substr(0, 19) + clockSequenceHex + uuid.substr(23)
  const uuidWithVariant = variantLens.setVariant(variant, uuidWithSequence)
  return uuidWithVariant
}

module.exports = {
  getClockSequence,
  setClockSequence
}
