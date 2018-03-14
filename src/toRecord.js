/**
 * @param {string} uuid
 * @return {object} record
 * @example
 * toRecord('9d6316aa-2106-11e8-b467-0ed5f89f718b')
 * // => {timeStr: '2018-03-06T06:21:32.883729000Z', version: 1, variant: 1, clockSequence: 13415, node: '0ed5f89f718b'}
 */
function toRecord (uuid) {
  return {
    timeStr: require('./lens/timeIso').getTimeIso(uuid),
    version: require('./lens/version').getVersion(uuid),
    variant: require('./lens/variant').getVariant(uuid),
    clockSequence: require('./lens/clockSequence').getClockSequence(uuid),
    node: require('./lens/node').getNode(uuid)
  }
}

module.export = toRecord
