import { IndexTable, has } from '../src/index-table'

it('finds entries from the static table', () => {
  const table = new IndexTable()
  expect(
    table.lookup(':method', 'GET')
  ).toEqual(
    [has.BOTH, 2]
  )
  expect(
    table.lookup('content-type', 'application/json')
  ).toEqual(
    [has.NAME, 31]
  )
  expect(
    table.lookup('x-cache-miss', 'true')
  ).toEqual(
    [has.NEITHER, 0]
  )
})

it('inserts entries into the dynamic table', () => {
  const table = new IndexTable()
  expect(
    table.lookup('foo', 'bar')
  ).toEqual(
    [has.NEITHER, 0]
  )
  expect(
    table.lookup('foo', 'bar')
  ).toEqual(
    [has.BOTH, 62]
  )
  expect(
    table.lookup('content-type', 'application/json')
  ).toEqual(
    [has.NAME, 31]
  )
  expect(
    table.getDynamicTable()
  ).toEqual(
    [
      ['foo', 'bar'],
      ['content-type', 'application/json']
    ]
  )
})
