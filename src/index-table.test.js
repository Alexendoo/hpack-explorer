import { staticTable, lookup, has } from "./index-table";

it("finds entries from the static table", () => {
	let ret = lookup(staticTable, ":method", "GET");

	expect(ret.table).toEqual(staticTable);
	expect(ret.has).toBe(has.BOTH);
	expect(ret.index).toBe(2);

	ret = lookup(staticTable, "content-type", "application/json");

	expect(ret.has).toBe(has.NAME);
	expect(ret.index).toBe(31);

	ret = lookup(staticTable, "x-cache-miss", "true");

	expect(ret.has).toBe(has.NEITHER);
	expect(ret.index).toBeFalsy();
});

it("inserts entries into the dynamic table", () => {
	let ret = lookup(staticTable, "foo", "bar");

	expect(ret.table.slice(0, -1)).toEqual(staticTable);
	expect(ret.has).toBe(has.NEITHER);

	ret = lookup(ret.table, "foo", "bar");

	expect(ret.table.slice(0, -1)).toEqual(staticTable);
	expect(ret.has).toBe(has.BOTH);
	expect(ret.index).toBe(62);

	ret = lookup(ret.table, "content-type", "application/json");

	expect(ret.has).toBe(has.NAME);
	expect(ret.index).toBe(31);

	ret = lookup(ret.table, "content-type", "application/json");

	expect(ret.has).toBe(has.BOTH);
	expect(ret.index).toBe(62);

	ret = lookup(ret.table, "foo", "bar");

	expect(ret.has).toBe(has.BOTH);
	expect(ret.index).toBe(63);
});
