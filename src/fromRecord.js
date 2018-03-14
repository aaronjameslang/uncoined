/**
 * @param {object} record
 * @return {string} uuid
 * @example
 * fromRecord({
 *   timeStr: '2018-03-06T06:21:32.883729000Z',
 *   version: 1,
 *   variant: 1,
 *   clockSequence: 13415,
 *   node: '0ed5f89f718b'
 * }) // => '9d6316aa-2106-11e8-b467-0ed5f89f718b'
 */
function fromRecord (record) {
  // TODO this would be nicer as a pipe
  let uuid = require('./lens/nil').setNil(true)
  uuid = require('./lens/timeIso').setTimeIso(record.timeStr, uuid)
  uuid = require('./lens/version').setVersion(record.version, uuid)
  uuid = require('./lens/variant').setVariant(record.variant, uuid)
  uuid = require('./lens/clockSequence').setClockSequence(record.clockSequence, uuid)
  uuid = require('./lens/node').setNode(record.node, uuid)
  return uuid
}

module.export = fromRecord
