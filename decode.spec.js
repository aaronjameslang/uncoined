const pathJoin = require('path').join
const decode = require('./decode')
const snapshot = require('snap-shot')
const test = require('ava')

const snapfile = pathJoin(
  __dirname,
  '__snapshots__',
  __filename.slice(__dirname.length + 1) + '.snap-shot'
)
const snaps = require(snapfile)

const testSnap = snap => {
  test('decode ' + snap.rfc, t => {
    t.plan(0)
    const decoded = decode.fromRfc(snap.rfc)
    snapshot({
      rfc: snap.rfc,
      decoded
    })
  })
}

for (const snap in snaps) {
  testSnap(snaps[snap])
}
