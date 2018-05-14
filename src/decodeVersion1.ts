import getNode from './getNode'
/**
 * @param {Uuid} uuid
 * @return {UuidVersion1}
 * @example
 * decodeVersion1('9d6316aa-2106-11e8-b467-0ed5f89f718b')
 * // => {datetime: '2018-03-06T06:21:32.883729000Z', version: 1, variant: 1, clockSequence: 13415, node: '0ed5f89f718b'}
 */
function decodeVersion1 (uuid: Uuid): UuidVersion1 {
  return {
    clockSequence: 13415,
    datetime: '2018-03-06T06:21:32.883729000Z',
    node: getNode(uuid),
    variant: 1,
    version: 1
  }
}
export default decodeVersion1
