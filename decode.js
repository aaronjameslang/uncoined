function readVariant (uuid) {
  const octit = uuid.readUInt8(8) >> 5
  return [0, 0, 0, 0, 1, 1, 3, 4][octit]
}

function readVersion (uuid) {
  return uuid.readUInt8(6) >> 4
}

function decode (uuid /* buffer */) {
  // TODO type check uuid
  return {
    variant: readVariant(uuid),
    version: readVersion(uuid)
  }
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
