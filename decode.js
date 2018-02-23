const libtime = require('./timestamp')

// S 4.1.2 Fields

function readTimeLow (uuid) {
  return uuid.readUInt32BE(0)
}

function readTimeMid (uuid) {
  return uuid.readUInt16BE(4)
}

function readTimeHighAndVersion (uuid) {
  return uuid.readUInt16BE(6)
}

function readClockSequenceAndReserved (uuid) {
  return uuid.readUInt16BE(8)
}

function readNode (uuid) {
  return uuid.readUIntBE(10, 6)
}

// S 4.1.1
function readVariant (uuid) {
  const octit = uuid.readUInt8(8) >> 5
  return [0, 0, 0, 0, 1, 1, 2, 3][octit]
}

// S 4.1.3
function readVersion (uuid) {
  return uuid.readUInt8(6) >> 4
}

// S 4.1.4
function readDateTime (uuid) {
  const unixTime = libtime.toUnixTime(
    readTimeHighAndVersion(uuid) & 0x0FFF,
    readTimeMid(uuid),
    readTimeLow(uuid)
  )
  const nanoSeconds =
    libtime.toNanoSeconds(readTimeLow(uuid))
  const date = new Date(unixTime * 1000)
  return date.toISOString().slice(0, -4) + nanoSeconds + 'Z'
}

// S 4.1.5
function readClockSequence (uuid) {
  const variant = readVariant(uuid)
  const mask = [0x7fff, 0x3fff, 0x1ff, 0x1ff][variant]
  return readClockSequenceAndReserved(uuid) & mask
}

// S 4.1.6
function readMacAddress (uuid) {
  return readNode(uuid).toString(16).match(/.{2}/g).join(':')
}

function decode (uuid /* buffer */) {
  // TODO type check uuid
  const decoded = {
    variant: readVariant(uuid),
    version: readVersion(uuid)
  }
  if (decoded.version === 1) {
    decoded.dateTime = readDateTime(uuid)
    decoded.clockSequnce = readClockSequence(uuid)
    decoded.macAddress = readMacAddress(uuid)
  }
  return decoded
}

function rfcToBuf (rfc) {
  const hex = rfc.replace(/-/g, '')
  return hexToBuf(hex)
}

function hexToBuf (hex) {
  return Buffer.from(hex, 'hex')
}

module.exports = decode
module.exports.fromRfc = uuid => decode(rfcToBuf(uuid))
