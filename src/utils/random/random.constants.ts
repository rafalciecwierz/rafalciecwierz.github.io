// FNV-1a, 32-bit: the offset basis and the prime from the algorithm's definition.
export const FNV_OFFSET_BASIS: number = 2166136261;
export const FNV_PRIME: number = 16777619;

// Mulberry32: the increment and the shift and multiply constants from its published version.
export const MULBERRY_INCREMENT: number = 0x6d2b79f5;
export const MULBERRY_SHIFT_A: number = 15;
export const MULBERRY_SHIFT_B: number = 7;
export const MULBERRY_SHIFT_C: number = 14;
export const MULBERRY_MULTIPLIER: number = 61;

// 2^32: turns an unsigned 32-bit integer into a number from 0 to 1.
export const UINT32_RANGE: number = 4294967296;
