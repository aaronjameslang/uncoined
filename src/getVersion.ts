/**
 * [RFC 4122 § 4.1.3 Version]{@link https://tools.ietf.org/html/rfc4122#section-4.1.3}
 * @param {string} uuid
 * @returns {number} Integer 0-16 incl.
 * @example getVersion('9d6316aa-2106-11e8-b467-0ed5f89f718b') // => 1
 * @example getVersion('8e8f2f0b-20c5-4ed1-85d4-bc34595a6ef0') // => 4
 * @example getVersion('8e8f2f0b-20c5-ded1-85d4-bc34595a6ef0') // => 13
 * @static
 */
function getVersion (uuid: Uuid): Version {
  const hexDigit = uuid.charAt(14)
  const version = parseInt(hexDigit, 16) as Version
  return version
}
export default getVersion
