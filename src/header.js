import { has, lookup, staticTable } from "./index-table";
import { integer, string } from "./primitives";

/**
 * converts a HTTP header to its binary representation, stores
 * lookups in the provided IndexTable
 *
 * http://httpwg.org/specs/rfc7541.html#detailed.format
 *
 * @param {string} name e.g. content-type
 * @param {string} value e.g. text/plain
 * @param {string[][]} table http://httpwg.org/specs/rfc7541.html#indexing.tables
 */
export function header(table, name, value) {
	const ret = lookup(table, name, value);
	switch (ret.has) {
		case has.BOTH:
			return {
				bytes: integer(7, ret.index, 128),
				has,
				table: ret.table
			};
		case has.NAME:
			return {
				bytes: [...integer(6, ret.index, 64), ...string(value)],
				has,
				table: ret.table
			};
		case has.NEITHER:
			return {
				bytes: [64, ...string(name), ...string(value)],
				has,
				table: ret.table
			};
		default:
			throw new Error("never");
	}
}

/**
 *
 * @param {{name: string, value: string}[][]} requests
 */
export function buildTables(requests) {
	let prevTable = staticTable;

	return requests.map(req =>
		req.map(({ name, value }) => {
			const { bytes, has, table } = header(prevTable, name, value);

			prevTable = table;

			return { name, value, table, bytes, has };
		})
	);
}
