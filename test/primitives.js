import test from 'ava'
import { bytes } from './_helpers'

import { integer, string } from '../src/primitives'

test('encodes integers', t => {
  // http://httpwg.org/specs/rfc7541.html#integer.representation.examples
  t.deepEqual(integer(5, 10), [0b01010])
  t.deepEqual(integer(5, 1337), [0b11111, 0b10011010, 0b00001010])
  t.deepEqual(integer(8, 42), [0b00101010])
})

test('encodes strings without huffman encoding', t => {
  // http://httpwg.org/specs/rfc7541.html#request.examples.without.huffman.coding
  t.deepEqual(string('www.example.com', false), bytes('0f 7777 772e 6578 616d 706c 652e 636f 6d'))
  t.deepEqual(string('custom-key', false), bytes('0a 6375 7374 6f6d 2d6b 6579'))

  // http://httpwg.org/specs/rfc7541.html#response.examples.without.huffman.coding
  t.deepEqual(string('Mon, 21 Oct 2013 20:13:21 GMT', false), bytes('1d 4d6f 6e2c 2032 3120 4f63 7420 3230 3133 2032 303a 3133 3a32 3120 474d 54'))
})

test('encodes strings with huffman encoding', t => {
  // http://httpwg.org/specs/rfc7541.html#request.examples.with.huffman.coding
  t.deepEqual(string('www.example.com'), bytes('8c f1e3 c2e5 f23a 6ba0 ab90 f4ff'))
  t.deepEqual(string('no-cache'), bytes('86 a8eb 1064 9cbf'))
  t.deepEqual(string('custom-key'), bytes('88 25a8 49e9 5ba9 7d7f'))
  t.deepEqual(string('custom-value'), bytes('89 25a8 49e9 5bb8 e8b4 bf'))

  // http://httpwg.org/specs/rfc7541.html#response.examples.with.huffman.coding
  t.deepEqual(string('302'), bytes('82 6402'))
  t.deepEqual(string('private'), bytes('85 aec3 771a 4b'))
  t.deepEqual(string('Mon, 21 Oct 2013 20:13:21 GMT'), bytes('96 d07a be94 1054 d444 a820 0595 040b 8166 e082 a62d 1bff'))
  t.deepEqual(string('https://www.example.com'), bytes('91 9d29 ad17 1863 c78f 0b97 c8e9 ae82 ae43 d3'))
  t.deepEqual(string('foo=ASDJKHQKBZXOQWEOPIUAXQWEOIU; max-age=3600; version=1'), bytes('ad 94e7 821d d7f2 e6c7 b335 dfdf cd5b 3960 d5af 2708 7f36 72c1 ab27 0fb5 291f 9587 3160 65c0 03ed 4ee5 b106 3d50 07'))
})
