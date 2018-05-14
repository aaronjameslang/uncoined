/**
 * [RFC 4122 § 4.1.3 Version]{@link https://tools.ietf.org/html/rfc4122#section-4.1.3}
 * @module
 */

/**
 * @param {string} uuid
 * @returns {number} Integer 0-16 incl.
 * @example get('9d6316aa-2106-11e8-b467-0ed5f89f718b') // => 1
 * @example get('8e8f2f0b-20c5-4ed1-85d4-bc34595a6ef0') // => 4
 * @example get('8e8f2f0b-20c5-ded1-85d4-bc34595a6ef0') // => 13
 * @static
 */
export function get (uuid: Uuid): Version {
  const hexDigit = uuid.charAt(14)
  const version = parseInt(hexDigit, 16)
  return version
}

/**
 * @param {number} version Integer 0-16 incl.
 * @param {string} uuid
 * @returns {string} uuid
 * @example
 * set(1, '8e8f2f0b-20c5-4ed1-85d4-bc34595a6ef0')
 *         // => '8e8f2f0b-20c5-1ed1-85d4-bc34595a6ef0'
 * @example
 * set(4, '9d6316aa-2106-11e8-b467-0ed5f89f718b')
 *         // => '9d6316aa-2106-41e8-b467-0ed5f89f718b'
 * @static
 */
export function set (version: Version, uuid: Uuid): Uuid {
  const hexDigit = version.toString(16)
  const uuid_ = uuid.substr(0, 14) + hexDigit + uuid.substr(15)
  return uuid_
}

