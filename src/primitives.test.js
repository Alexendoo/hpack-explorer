import { bytes } from './_helpers'

import { integer, string } from '../src/primitives'

it('encodes integers', () => {
  // http://httpwg.org/specs/rfc7541.html#integer.representation.examples
  expect(integer(5, 10)).toEqual([0b01010])
  expect(integer(5, 1337)).toEqual([0b11111, 0b10011010, 0b00001010])
  expect(integer(8, 42)).toEqual([0b00101010])
})

it('encodes strings without huffman encoding', () => {
  // http://httpwg.org/specs/rfc7541.html#request.examples.without.huffman.coding
  expect(string('www.example.com', false)).toEqual(bytes('0f 7777 772e 6578 616d 706c 652e 636f 6d'))
  expect(string('custom-key', false)).toEqual(bytes('0a 6375 7374 6f6d 2d6b 6579'))

  // http://httpwg.org/specs/rfc7541.html#response.examples.without.huffman.coding
  expect(string('Mon, 21 Oct 2013 20:13:21 GMT', false)).toEqual(bytes('1d 4d6f 6e2c 2032 3120 4f63 7420 3230 3133 2032 303a 3133 3a32 3120 474d 54'))
})

it('encodes strings with huffman encoding', () => {
  // http://httpwg.org/specs/rfc7541.html#request.examples.with.huffman.coding
  expect(string('www.example.com')).toEqual(bytes('8c f1e3 c2e5 f23a 6ba0 ab90 f4ff'))
  expect(string('no-cache')).toEqual(bytes('86 a8eb 1064 9cbf'))
  expect(string('custom-key')).toEqual(bytes('88 25a8 49e9 5ba9 7d7f'))
  expect(string('custom-value')).toEqual(bytes('89 25a8 49e9 5bb8 e8b4 bf'))

  // http://httpwg.org/specs/rfc7541.html#response.examples.with.huffman.coding
  expect(string('302')).toEqual(bytes('82 6402'))
  expect(string('private')).toEqual(bytes('85 aec3 771a 4b'))
  expect(string('Mon, 21 Oct 2013 20:13:21 GMT')).toEqual(bytes('96 d07a be94 1054 d444 a820 0595 040b 8166 e082 a62d 1bff'))
  expect(string('https://www.example.com')).toEqual(bytes('91 9d29 ad17 1863 c78f 0b97 c8e9 ae82 ae43 d3'))
  expect(string('foo=ASDJKHQKBZXOQWEOPIUAXQWEOIU; max-age=3600; version=1')).toEqual(bytes('ad 94e7 821d d7f2 e6c7 b335 dfdf cd5b 3960 d5af 2708 7f36 72c1 ab27 0fb5 291f 9587 3160 65c0 03ed 4ee5 b106 3d50 07'))
})
