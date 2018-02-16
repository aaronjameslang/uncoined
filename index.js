const b64 = hex => new Buffer(hex.replace(/-/g,''), 'hex').toString('base64')

const coinable = (die, planchet) => die.length <= 22

const coin = (die, planchet) => die + b64(planchet).slice(die.length, planchet.length)

module.exports = {
  coin,
  coinable,
}
