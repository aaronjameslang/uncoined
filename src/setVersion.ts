/**
 * [RFC 4122 § 4.1.3 Version]{@link https://tools.ietf.org/html/rfc4122#section-4.1.3}
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
function setVersion (version: Version, uuid: Uuid): Uuid {
  const hexDigit = version.toString(16)
  const uuid$ = uuid.substr(0, 14) + hexDigit + uuid.substr(15)
  return uuid$
}
export default setVersion
