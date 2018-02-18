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

const flipChar = c => {
  if (c !== c.toUpperCase(c)) {
    return c.toUpperCase(c)
  }
  if (c !== c.toLowerCase(c)) {
    return c.toLowerCase(c)
  }
  return c
}

const flipCharAt = (string, index) => {
  const c = string[index]
  const fc = flipChar(c)
  return string.slice(0, index) + fc + string.slice(index + 1)
}

const coinAll = (die, planchet) => {
  const planchet64 = b64(planchet)
  const candidates = R.map(
    i => planchet64.slice(0, i) + die + planchet64.slice(i + die.length),
    R.range(0, 23 - die.length)
  )
  const rtn = []
  candidates.forEach(candidate => {
    const candidateRfc = R.pipe(
      b64ToHex, hexToRfc
    )(candidate)
    if (uv(candidateRfc)) {
      rtn.push(candidate)
      return
    }
    const candidate2 = flipCharAt(candidate, 8)
    const candidate2Rfc = R.pipe(
      b64ToHex, hexToRfc
    )(candidate2)
    if (uv.version(candidate2Rfc) === 4) {
      rtn.push(candidate2)
    }
  })
  return rtn
}

module.exports = {
  coin,
  coinAll,
  coinable,
  flipCharAt
}
