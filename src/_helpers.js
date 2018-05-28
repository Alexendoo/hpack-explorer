/**
 * @param {string} hex
 * @returns {number[]}
 */
export function bytes(hex) {
  return hex.match(/[0-9a-zA-Z]{2}/g)
    .map(octet => parseInt(octet, 16))
}
