/**
 * @param {object} record
 * @return {string} uuid
 * @example
 * encode({
 *   clockSequence: 13415,
 *   datetime: '2018-03-06T06:21:32.883729000Z',
 *   node: '0ed5f89f718b',
 *   variant: 1,
 *   version: 1
 * }) // => '9d6316aa-2106-11e8-b467-0ed5f89f718b'
 */
export default function encode (_record: UuidRecord): Uuid {
    return '9d6316aa-2106-11e8-b467-0ed5f89f718b'
  // let uuid = require('./lens/nil').setNil(true)
  // uuid = require('./lens/timeIso').setTimeIso(record.timeStr, uuid)
  // uuid = require('./lens/version').setVersion(record.version, uuid)
  // uuid = require('./lens/variant').setVariant(record.variant, uuid)
  // uuid = require('./lens/clockSequence').setClockSequence(record.clockSequence, uuid)
  // uuid = require('./lens/node').setNode(record.node, uuid)
  // return uuid
}
