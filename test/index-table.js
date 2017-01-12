import test from 'ava'

import { IndexTable, has } from '../src/index-table'

test('finds entries from the static table', t => {
  const table = new IndexTable()
  t.deepEqual(
    table.lookup(':method', 'GET'),
    [has.BOTH, 2]
  )
  t.deepEqual(
    table.lookup('content-type', 'application/json'),
    [has.NAME, 31]
  )
  t.deepEqual(
    table.lookup('x-cache-miss', 'true'),
    [has.NEITHER, 0]
  )
})

test('inserts entries into the dynamic table', t => {
  const table = new IndexTable()
  t.deepEqual(
    table.lookup('foo', 'bar'),
    [has.NEITHER, 0]
  )
  t.deepEqual(
    table.lookup('foo', 'bar'),
    [has.BOTH, 62]
  )
  t.deepEqual(
    table.lookup('content-type', 'application/json'),
    [has.NAME, 31]
  )
  t.deepEqual(
    table.getDynamicTable(),
    [
      ['foo', 'bar'],
      ['content-type', 'application/json']
    ]
  )
})
