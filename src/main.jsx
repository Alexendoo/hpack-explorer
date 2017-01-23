import { h, render, Component } from 'preact'

import { header } from './header'
import { IndexTable } from './index-table'

class Headers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      headers: [['', '']]
    }
  }

  updateKey(event, index) {
    this.state.headers[index][0] = event.target.value
    this.setState()
  }

  updateValue(event, index) {
    this.state.headers[index][1] = event.target.value
    this.setState()
  }

  componentWillUpdate() {
    const last = this.state.headers[this.state.headers.length - 1]
    if (last[0]) this.state.headers.push(['', ''])

    for (let i = 0; i < this.state.headers.length - 1; i++) {
      const [key, value] = this.state.headers[i]
      if (!key && !value) this.state.headers.splice(i, 1)
    }
  }

  render() {
    return (
      <div>
        {
          this.state.headers.map((header, index) => (
            <div>
              <input value={header[0]} onInput={e => this.updateKey(e, index)} />
              <input value={header[1]} onInput={e => this.updateValue(e, index)} />
            </div>
          ))
        }
        <HexDump headers={this.state.headers} />
      </div>
    )
  }
}

class HexDump extends Component {
  render({headers}) {
    const table = new IndexTable()

    const sections = []
    for (let i = 0; i < headers.length; i++) {
      const name = headers[i][0]
      const value = headers[i][1]
      if (!name || !value) continue

      sections.push(
        <ByteSegment
          name={name}
          value={value}
          bytes={header(name, value, table)} />
      )
    }

    return (
      <div>
        {sections}
      </div>
    )
  }
}

class ByteSegment extends Component {
  render({name, value, bytes}) {
    return (
      <div>
        <div>{name}</div>
        <div>{value}</div>
        <div>{JSON.stringify(bytes)}</div>
      </div>
    )
  }
}

render(<Headers />, document.body)
