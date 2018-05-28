// http://httpwg.org/specs/rfc7541.html#static.table.definition
export const staticTable = [
  [':authority'],
  [':method', 'GET'],
  [':method', 'POST'],
  [':path', '/'],
  [':path', '/index.html'],
  [':scheme', 'http'],
  [':scheme', 'https'],
  [':status', '200'],
  [':status', '204'],
  [':status', '206'],
  [':status', '304'],
  [':status', '400'],
  [':status', '404'],
  [':status', '500'],
  ['accept-charset'],
  ['accept-encoding', 'gzip, deflate'],
  ['accept-language'],
  ['accept-ranges'],
  ['accept'],
  ['access-control-allow-origin'],
  ['age'],
  ['allow'],
  ['authorization'],
  ['cache-control'],
  ['content-disposition'],
  ['content-encoding'],
  ['content-language'],
  ['content-length'],
  ['content-location'],
  ['content-range'],
  ['content-type'],
  ['cookie'],
  ['date'],
  ['etag'],
  ['expect'],
  ['expires'],
  ['from'],
  ['host'],
  ['if-match'],
  ['if-modified-since'],
  ['if-none-match'],
  ['if-range'],
  ['if-unmodified-since'],
  ['last-modified'],
  ['link'],
  ['location'],
  ['max-forwards'],
  ['proxy-authenticate'],
  ['proxy-authorization'],
  ['range'],
  ['referer'],
  ['refresh'],
  ['retry-after'],
  ['server'],
  ['set-cookie'],
  ['strict-transport-security'],
  ['transfer-encoding'],
  ['user-agent'],
  ['vary'],
  ['via'],
  ['www-authenticate']
]

/**
 * @readonly
 * @enum {number}
 */
export const has = {
  BOTH: 2,
  NAME: 1,
  NEITHER: 0,
}

export class IndexTable {
  /**
   * create an IndexTable
   */
  constructor() {
    this.table = staticTable.slice(0)
    this.staticLength = staticTable.length
  }

  /**
   * insert a new header field into the dynamic table
   *
   * @param {string} name
   * @param {string} value
   */
  push(name, value) {
    this.table.push([name, value])
  }

  /**
   * looks for a header field in the table, creating a new
   * field in the dynamic table if missing
   *
   * @param {string} name
   * @param {string} value
   * @returns {[number, number]} a tuple -
   * [
   *   if the table {@link has} the name + value, name or neither,
   *   index of the record in the table
   * ]
   */
  lookup(name, value) {
    for (let i = 0; i < this.table.length; i++) {
      const [lookupName, lookupValue] = this.table[i]
      if (lookupName === name) {
        if (lookupValue === value) {
          return [has.BOTH, i + 1]
        }

        this.push(name, value)
        return [has.NAME, i + 1]
      }
    }
    this.push(name, value)
    return [has.NEITHER, 0]
  }

  /**
   * get a header field by index
   *
   * @param {number} number
   * @returns {[string, string]} a tuple -
   * [
   *   name,
   *   value - optional
   * ]
   */
  index(number) {
    return this.table[number + 1]
  }

  /**
   * @returns {[string, string][]} an array of [name, value] pairs
   */
  getDynamicTable() {
    return this.table.slice(this.staticLength)
  }
}
