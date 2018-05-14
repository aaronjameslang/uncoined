import { get as getVersion } from './lens/version'
import { get as getVariant } from './lens/variant'

/**
 * @param {string} uuid
 * @return {object} record
 * @example
 * decode('9d6316aa-2106-11e8-b467-0ed5f89f718b')
 * // => {datetime: '2018-03-06T06:21:32.883729000Z', version: 1, variant: 1, clockSequence: 13415, node: '0ed5f89f718b'}
 */
const decode = (uuid: Uuid): UuidRecord => {
    const variant = getVariant(uuid)
    return [
        decodeVariant0,
        decodeVariant1,
        decodeVariant2,
        decodeVariant3,
    ][variant](uuid)
}

export default decode

export const decodeVariant0 = (_uuid: Uuid): UuidVariant0 => ({
    variant: 0
})
export const decodeVariant1 = (uuid: Uuid): UuidVariant1 => {
    const version = getVersion(uuid)
    if (version < 1 || version > 5) {
        return {
            variant: 1,
            version,
        }
    }
    return [
        decodeVersion1,
        decodeVersion2,
        decodeVersion3,
        decodeVersion4,
        decodeVersion5,
    ][version - 1](uuid)
}
export const decodeVariant2 = decodeVariant1
export const decodeVariant3 = (uuid: Uuid): UuidVariant3 => ({
    uuid,
    variant: 3,
})

export const decodeVersion1 = (_uuid: Uuid): UuidVersion1 => ({
    clockSequence: 13415,
    datetime: '2018-03-06T06:21:32.883729000Z',
    node: '0ed5f89f718b',
    variant: 1,
    version: 1,
})
export const decodeVersion2 = (_uuid: Uuid): UuidVersion2 => ({
    version: 2
})
export const decodeVersion3 = (_uuid: Uuid): UuidVersion3 => ({
    version: 3
})
export const decodeVersion4 = (_uuid: Uuid): UuidVersion4 => ({
    version: 4
})
export const decodeVersion5 = (_uuid: Uuid): UuidVersion5 => ({
    version: 5
})

