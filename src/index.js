import React from 'react'
import ReactDOM from 'react-dom'
import { staticTable } from './index-table';
import { List } from 'immutable';
import { header } from './header';

class Headers extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      table: staticTable,
      headers: List([['', '']])
    }
  }

  update = (name, value, index) => {
    let headers = this.state.headers
    const last = headers.size === index + 1

    if (!last && name === "" && value === "") {
      headers = headers.delete(index)
    } else {
      if (last) headers = headers.push(['', ''])
      headers = headers.set(index, [name, value])
    }

    this.setState({headers})
  }

  updateName = (event, index) => {
    this.update(
      event.target.value,
      this.state.headers.get(index)[1],
      index
    )
  }

  updateValue = (event, index) => {
    this.update(
      this.state.headers.get(index)[0],
      event.target.value,
      index
    )
  }

  render() {
    const headers = this.state.headers

    const headerTable = headers.map(([name, value], index) =>
      <div key={index}>
        <div>
          <input value={name} onInput={e => this.updateName(e, index)} />
          <input value={value} onInput={e => this.updateValue(e, index)} />
        </div>
      </div>
    )

    return (
      <main>
        <a href="https://http2.github.io/http2-spec/compression.html">Spec</a>

        {headerTable}

        <HexDump headers={headers.filter(h => h.every(Boolean))} />
      </main>
    )
  }
}

class HexDump extends React.PureComponent {
  render() {
    /** @type {List<string[]>} */
    const headers = this.props.headers

    let table = staticTable

    return headers.map(([name, value], index) => {
      const ret = header(table, name, value)

      table = ret.table

      return (
        <div key={index}>
          {name}/{value}: {ret.bytes.map(b => b.toString(16))}
        </div>
      )
    })
  }
}

ReactDOM.render(<Headers />, document.getElementById("app"))
