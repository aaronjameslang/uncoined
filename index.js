const R = require('ramda')
const uv = require('uuid-validate')

const b64 = hex => Buffer.from(hex.replace(/-/g, ''), 'hex').toString('base64')
const b64ToHex = b64 => Buffer.from(b64, 'base64').toString('hex')
// RFC 4122 : 8-4-4-4-12
const hexToRfc = hex => {
  let x = 0
  const rfc = hex.substring(x, x += 8) +
   '-' + hex.substring(x, x += 4) +
   '-' + hex.substring(x, x += 4) +
   '-' + hex.substring(x, x += 4) +
   '-' + hex.substring(x)
  return rfc
}

const coinable = (die, planchet) => die.length <= 22

const coin = (die, planchet) => die + b64(planchet).slice(die.length, planchet.length)

const coinAll = (die, planchet) => {
  const planchet64 = b64(planchet)
  const candidates = R.map(
    i => planchet64.slice(0, i) + die + planchet64.slice(i + die.length),
    R.range(0, 23 - die.length)
  )
  return R.filter(
    R.pipe(b64ToHex, hexToRfc, uv),
    candidates
  )
}

module.exports = {
  coin,
  coinAll,
  coinable
}
