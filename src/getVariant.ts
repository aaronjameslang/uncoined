/**
 * [RFC 4122 § 4.1.1 Variant]{@link https://tools.ietf.org/html/rfc4122#section-4.1.1}
 * @param {string} uuid
 * @returns {number} Integer 0-3 incl.
 * @example getVariant('9d6316aa-2106-11e8-b467-0ed5f89f718b') // => 1
 * @example getVariant('20c52f0b-8e8f-4ed1-c5d4-bc34595a6ef0') // => 2
 * @static
 */
 function getVariant(uuid: Uuid) {
  const hexDigit = uuid.charAt(19)
  const octDigit = parseInt(hexDigit, 16) >> 1
  const variant = [0, 0, 0, 0, 1, 1, 2, 3][octDigit]
  return variant
}
export default getVariant