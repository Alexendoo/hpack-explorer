import { bytes } from "./_helpers";
import { header } from "./header";
import { staticTable } from "./index-table";

it("encodes fully indexed headers", () => {
	let ret = header(staticTable, ":method", "GET");

	expect(ret.bytes).toEqual(bytes("82"));

	// first call adds the entry
	ret = header(ret.table, "foo", "bar");
	ret = header(ret.table, "foo", "bar");

	expect(ret.bytes).toEqual(bytes("be"));
});

it("encodes partially indexed headers", () => {
	let ret = header(staticTable, ":authority", "www.example.com");

	expect(ret.bytes).toEqual(bytes("41 8c f1e3 c2e5 f23a 6ba0 ab90 f4ff"));
});

it("encodes non indexed headers", () => {
	let ret = header(staticTable, "custom-key", "custom-value");

	expect(ret.bytes).toEqual(
		bytes("40 88 25a8 49e9 5ba9 7d7f 89 25a8 49e9 5bb8 e8b4 bf")
	);
});
