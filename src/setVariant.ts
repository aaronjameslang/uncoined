/**
 * [RFC 4122 § 4.1.1 Variant]{@link https://tools.ietf.org/html/rfc4122#section-4.1.1}
 * @param {number} variant Integer 0-3 incl.
 * @param {string} uuid
 * @returns {string} uuid
 * @example
 * setVariant(0, '20c52f0b-8e8f-4ed1-c5d4-bc34595a6ef0')
 *         // => '20c52f0b-8e8f-4ed1-45d4-bc34595a6ef0'
 * @example
 * setVariant(1, '20c52f0b-8e8f-4ed1-c5d4-bc34595a6ef0')
 *         // => '20c52f0b-8e8f-4ed1-85d4-bc34595a6ef0'
 * @example
 * setVariant(2, '9d6316aa-2106-11e8-b467-0ed5f89f718b')
 *         // => '9d6316aa-2106-11e8-d467-0ed5f89f718b'
 * @example
 * setVariant(2, '9d6316aa-2106-11e8-a467-0ed5f89f718b')
 *         // => '9d6316aa-2106-11e8-c467-0ed5f89f718b'
 * @example
 * setVariant(3, '9d6316aa-2106-11e8-b467-0ed5f89f718b')
 *         // => '9d6316aa-2106-11e8-f467-0ed5f89f718b'
 * @static
 */
export function setVariant (variant: Variant, uuid: Uuid) {
  const hexDigit = uuid.charAt(19)
  let nybble = parseInt(hexDigit, 16)
  switch (variant) {
    case 0: nybble = nybble & 0b0111; break
    case 1: nybble = nybble & 0b0011 | 0b1000; break
    case 2: nybble = nybble & 0b0001 | 0b1100; break
    case 3: nybble = nybble & 0b0001 | 0b1110; break
  }
  const hexDigit$ = nybble.toString(16)
  const uuid$ = uuid.substr(0, 19) + hexDigit$ + uuid.substr(20)
  return uuid$
}

export default setVariant
