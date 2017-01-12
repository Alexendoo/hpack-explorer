'use strict'

/**
 * http://httpwg.org/specs/rfc7541.html#integer.representation
 *
 * @param {number} prefix
 * @param {number} value
 * @returns {number[]}
 */
export function integer(prefix, value) {
  const max = Math.pow(2, prefix) - 1

  if (value < max) return [value]

  const out = [max]
  value -= max
  while (value >= 128) {
    out.push(value % 128 + 128)
    value = Math.floor(value / 128)
  }
  out.push(value)

  return out
}

/**
 * http://httpwg.org/specs/rfc7541.html#string.literal.representation
 *
 * @param {string} str
 * @param {boolean} [huffman=true]
 * @returns {number[]}
 */
export function string(str, huffman = true) {
  if (huffman) {

  } else {
    return [
      ...integer(7, str.length),
      ...str.split('').map(char => char.charCodeAt(0))
    ]
  }
}