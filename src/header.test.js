import { bytes } from './_helpers'

import { header } from './header'
import { IndexTable } from './index-table'

it('encodes fully indexed headers', () => {
  const table = new IndexTable()

  expect(
    header(':method', 'GET', table)
  ).toEqual(
    bytes('82')
  )

  table.lookup('foo', 'bar')

  expect(
    header('foo', 'bar', table)
  ).toEqual(
    bytes('be')
  )
})

it('encodes partially indexed headers', () => {
  const table = new IndexTable()

  expect(
    header(':authority', 'www.example.com', table)
  ).toEqual(
    bytes('41 8c f1e3 c2e5 f23a 6ba0 ab90 f4ff')
  )
})

it('encodes non indexed headers', () => {
  const table = new IndexTable()

  expect(
    header('custom-key', 'custom-value', table)
  ).toEqual(
    bytes('40 88 25a8 49e9 5ba9 7d7f 89 25a8 49e9 5bb8 e8b4 bf')
  )
})
