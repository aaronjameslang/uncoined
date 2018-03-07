/**
 * [RFC 4122 § 4.1.3 Version]{@link https://tools.ietf.org/html/rfc4122#section-4.1.3}
 * @module
 */

/**
 * @param {string} uuid
 * @returns {number} Integer 0-16 incl.
 * @example getVersion('9d6316aa-2106-11e8-b467-0ed5f89f718b') // => 1
 * @example getVersion('8e8f2f0b-20c5-4ed1-85d4-bc34595a6ef0') // => 4
 * @example getVersion('8e8f2f0b-20c5-ded1-85d4-bc34595a6ef0') // => 13
 * @static
 */
function getVersion (uuid) {
  const hexDigit = uuid.charAt(14)
  const version = Number.parseInt(hexDigit, 16)
  return version
}

/**
 * @param {number} version Integer 0-16 incl.
 * @param {string} uuid
 * @returns {string} uuid
 * @example
 * setVersion(1, '8e8f2f0b-20c5-4ed1-85d4-bc34595a6ef0')
 *         // => '8e8f2f0b-20c5-1ed1-85d4-bc34595a6ef0'
 * @example
 * setVersion(4, '9d6316aa-2106-11e8-b467-0ed5f89f718b')
 *         // => '9d6316aa-2106-41e8-b467-0ed5f89f718b'
 * @static
 */
function setVersion (version, uuid) {
  const hexDigit = version.toString(16)
  const uuid_ = uuid.substr(0, 14) + hexDigit + uuid.substr(15)
  return uuid_
}

module.exports = {
  getVersion,
  setVersion
}
