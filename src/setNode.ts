/**
 * [RFC 4122 § 4.1.6 Node]{@link https://tools.ietf.org/html/rfc4122#section-4.1.6}
 * @param {string} node [0-9a-f]{12}
 * @param {string} uuid
 * @returns {string} uuid
 * @example
 * setNode('bc34595a6ef0',  '9d6316aa-2106-11e8-b467-0ed5f89f718b')
 *                    // => '9d6316aa-2106-11e8-b467-bc34595a6ef0'
 * @static
 */
export function setNode (node: string, uuid: Uuid) {
  return uuid.substr(0, 24) + node
}
