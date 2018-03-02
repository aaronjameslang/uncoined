const NIL_UUID = '00000000-0000-0000-0000-000000000000'

/**
 * Determine if `uuid` is "Nil" according to [RFC 4122 § 4.1.7]{@link https://tools.ietf.org/html/rfc4122#section-4.1.7}
 * @params {string} uuid
 * @returns {boolean}
 */
function isNil (uuid) {
  return uuid === NIL_UUID
}

/**
 * [§ 4.1.1 Variant]{@link https://tools.ietf.org/html/rfc4122#section-4.1.1}
 */
function readVariant (uuid) {
  const hexDigit = uuid.charAt(19)
  const octDigit = Number.parseInt(hexDigit, 16) >> 1
  return [0, 0, 0, 0, 1, 1, 2, 3][octDigit]
}

/**
 * [§ 4.1.3 Version]{@link https://tools.ietf.org/html/rfc4122#section-4.1.3}
 */
function readVersion (uuid) {
  const hexDigit = uuid.charAt(14)
  return Number.parseInt(hexDigit, 16)
}

exports.isNil = isNil
exports.readVariant = readVariant
exports.readVersion = readVersion
