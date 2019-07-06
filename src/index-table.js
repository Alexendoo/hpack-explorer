// http://httpwg.org/specs/rfc7541.html#static.table.definition
export const staticTable = [
	// no entry at index 0
	[],
	[":authority"],
	[":method", "GET"],
	[":method", "POST"],
	[":path", "/"],
	[":path", "/index.html"],
	[":scheme", "http"],
	[":scheme", "https"],
	[":status", "200"],
	[":status", "204"],
	[":status", "206"],
	[":status", "304"],
	[":status", "400"],
	[":status", "404"],
	[":status", "500"],
	["accept-charset"],
	["accept-encoding", "gzip, deflate"],
	["accept-language"],
	["accept-ranges"],
	["accept"],
	["access-control-allow-origin"],
	["age"],
	["allow"],
	["authorization"],
	["cache-control"],
	["content-disposition"],
	["content-encoding"],
	["content-language"],
	["content-length"],
	["content-location"],
	["content-range"],
	["content-type"],
	["cookie"],
	["date"],
	["etag"],
	["expect"],
	["expires"],
	["from"],
	["host"],
	["if-match"],
	["if-modified-since"],
	["if-none-match"],
	["if-range"],
	["if-unmodified-since"],
	["last-modified"],
	["link"],
	["location"],
	["max-forwards"],
	["proxy-authenticate"],
	["proxy-authorization"],
	["range"],
	["referer"],
	["refresh"],
	["retry-after"],
	["server"],
	["set-cookie"],
	["strict-transport-security"],
	["transfer-encoding"],
	["user-agent"],
	["vary"],
	["via"],
	["www-authenticate"]
];

/**
 * @readonly
 * @enum {number}
 */
export const has = {
	BOTH: 2,
	NAME: 1,
	NEITHER: 0
};

/**
 * looks for a header field in the table, creating a new
 * field in the dynamic table if missing
 *
 * @param {string[][]} table
 * @param {string} name
 * @param {string} value
 */
export function lookup(table, name, value) {
	let partial;

	for (let index = 1; index < table.length; index++) {
		const [lookupName, lookupValue] = table[index];
		if (lookupName === name) {
			if (lookupValue === value) {
				return {
					table,
					has: has.BOTH,
					index
				};
			}

			if (partial === undefined) {
				partial = {
					has: has.NAME,
					index
				};
			}
		}
	}

	if (partial !== undefined) {
		return {
			table: insert(table, name, value),
			...partial
		};
	}

	return {
		table: insert(table, name, value),
		has: has.NEITHER,
		index: null
	};
}

/**
 * Insert an entry (name, value) into the table
 *
 * @param {string[][]} table
 * @param {string} name
 * @param {string} value
 */
function insert(table, name, value) {
	return [...staticTable, [name, value], ...table.slice(staticTable.length)];
}
