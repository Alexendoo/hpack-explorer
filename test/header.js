import test from 'ava'
import { bytes } from './_helpers'

import { header } from '../src/header'
import { IndexTable } from '../src/index-table'

test('encodes fully indexed headers', t => {
  const table = new IndexTable()

  t.deepEqual(
    header(':method', 'GET', table),
    bytes('82')
  )

  table.lookup('foo', 'bar')
  t.deepEqual(
    header('foo', 'bar', table),
    bytes('be')
  )
})

test('encodes partially indexed headers', t => {
  const table = new IndexTable()

  t.deepEqual(
    header(':authority', 'www.example.com', table),
    bytes('41 8c f1e3 c2e5 f23a 6ba0 ab90 f4ff')
  )
})

test('encodes non indexed headers', t => {
  const table = new IndexTable()

  t.deepEqual(
    header('custom-key', 'custom-value', table),
    bytes('40 88 25a8 49e9 5ba9 7d7f 89 25a8 49e9 5bb8 e8b4 bf')
  )
})
