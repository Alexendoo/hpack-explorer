import huffman from "./huffman";

/**
 * http://httpwg.org/specs/rfc7541.html#integer.representation
 *
 * @param {number} prefix
 * @param {number} value
 * @param {number} [carry=0]
 * @returns {number[]}
 */
export function integer(prefix, value, carry = 0) {
	const max = 2 ** prefix - 1;

	if (value < max) return [value ^ carry];

	const out = [max ^ carry];
	value -= max;
	while (value >= 128) {
		out.push((value % 128) + 128);
		value = Math.floor(value / 128);
	}
	out.push(value);

	return out;
}

/**
 * http://httpwg.org/specs/rfc7541.html#string.literal.representation
 *
 * @param {string} str
 * @param {boolean} [encoded=true]
 * @returns {number[]}
 */
export function string(str, encoded = true) {
	if (str.length === 0) {
		return integer(7, 0);
	}

	if (encoded) {
		const enc = huffman(str);
		return [...integer(7, enc.length, 128), ...enc];
	}

	return [
		...integer(7, str.length),
		...str.split("").map(char => char.charCodeAt(0))
	];
}
