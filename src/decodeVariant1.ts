import decodeVersion1 from './decodeVersion1'
import getVersion from './getVersion'

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

function decodeVariant1 (uuid: Uuid): UuidVariant1 {
  const version = getVersion(uuid)
  if (version < 1 || version > 5) {
    return {
      variant: 1,
      version
    }
  }
  return [
    decodeVersion1,
    decodeVersion2,
    decodeVersion3,
    decodeVersion4,
    decodeVersion5
  ][version - 1](uuid)
}
export default decodeVariant1
