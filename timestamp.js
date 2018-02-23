/**
 * A module for working with uuid timestamps
 *
 * ## [RFC 4122 S 4.1.4](https://tools.ietf.org/html/rfc4122#section-4.1.4)
 *
 * The timestamp is a 60-bit value.  For UUID version 1, this is
 * represented by Coordinated Universal Time (UTC) as a count of 100-
 * nanosecond intervals since 00:00:00.00, 15 October 1582 (the date of
 * Gregorian reform to the Christian calendar).
 *
 * ## Considerations
 *
 *   - Numbers in javacript are 65 bit double precision floats, a la IEEE 754
 *   - This allows only 53 bits of integer precision
 *   - Bitwise operations mod results to 32 bits
 *
 *   - tick: 100ns, max 2^60 - 1
 *   - microsecond, us: 10 ticks, max 2^59 * 5^-1 - 10^-1
 *   - milliseconds, ms: 1000us, max 2^56 * 5^-4 - 10^-4
 *   - seconds, s: 1000ms, max 2^53 * 5^-7 - 10^-7
 */

const UNIX_TIME_1582_OCT_15 = -12219292800

function toTicks (high, mid, low) {
  return (0x0FFF & high) * Math.pow(2, 48) +
                  mid * Math.pow(2, 32) +
                  low
}

function toSeconds (high, mid, low) {
  return Math.floor((
    (0x0FFF & high) * Math.pow(2, 41) +
    mid * Math.pow(2, 25) +
    Math.floor(low * Math.pow(2, -7))
  ) / Math.pow(5, 7))
}

function toUnixTime (high, mid, low) {
  return UNIX_TIME_1582_OCT_15 +
    toSeconds(high, mid, low)
}

function toNanoSeconds (low) {
  return (low * 100) % Math.pow(10, 9)
}

module.exports = {
  toTicks,
  toSeconds,
  toUnixTime,
  toNanoSeconds
}
