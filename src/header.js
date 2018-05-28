import { has } from './index-table'
import { integer, string } from './primitives'

/**
 * converts a HTTP header to its binary representation, stores
 * lookups in the provided IndexTable
 *
 * http://httpwg.org/specs/rfc7541.html#detailed.format
 *
 * @param {string} name e.g. content-type
 * @param {string} value e.g. text/plain
 * @param {IndexTable} table http://httpwg.org/specs/rfc7541.html#indexing.tables
 * @returns {number[]} binary representation
 */
export function header(name, value, table) {
  const [result, index] = table.lookup(name, value)
  switch (result) {
    case has.BOTH:
      return integer(7, index, 128)
    case has.NAME:
      return [
        ...integer(6, index, 64),
        ...string(value)
      ]
    case has.NEITHER:
      return [
        64,
        ...string(name),
        ...string(value)
      ]
    default:
      throw new Error('never')
  }
}
