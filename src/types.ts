type Uuid = string;

type UuidVariant0 = {
    // addressFamily,
    // datetime: DateTime,
    // hostId,
    // reserved?: number,
    // variant: 0,
    // isNil: boolean,
}

type UuidVariant3 = {
    uuid: Uuid,
    variant: 3,
}

type UuidVersion1 = {
    clockSequence: ClockSequence,
    datetime: DateTime,
    node: Nod,
    variant: 1 | 2,
    version: 1,
}
type UuidVersion2 = {}
type UuidVersion3 = {}
type UuidVersion4 = {}
type UuidVersion5 = {}
type UuidVariant1
    = UuidVersion1
    | UuidVersion2
    | UuidVersion3
    | UuidVersion4
    | UuidVersion5
type UuidVariant2 = UuidVariant1

type UuidRecord
    = UuidVariant0
    | UuidVariant1
    | UuidVariant2
    | UuidVariant3

type ClockSequence = number
type DateTime = string
type Nod = string
type Variant = 0 | 1 | 2 | 3
type Version
    = 0x0 | 0x1 | 0x2 | 0x3
    | 0x4 | 0x5 | 0x6 | 0x7
    | 0x8 | 0x9 | 0xA | 0xB
    | 0xC | 0xD | 0xE | 0xF
