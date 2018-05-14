/**
 * [RFC 4122 § 4.1.6 Node]{@link https://tools.ietf.org/html/rfc4122#section-4.1.6}
 * @param {string} uuid
 * @returns {string} [0-9a-f]{12}
 * @example getNode('9d6316aa-2106-11e8-b467-0ed5f89f718b') // => '0ed5f89f718b'
 * @static
 */
function getNode (uuid: Uuid) {
  return uuid.substr(24)
}

export default getNode
