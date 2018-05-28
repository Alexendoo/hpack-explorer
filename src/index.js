import React from 'react'
import ReactDOM from 'react-dom'
import { staticTable } from './index-table';
import { List } from 'immutable';

// class Headers extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       headers: [['', '']]
//     }
//   }

//   updateKey(event, index) {
//     const headers = this.state.headers.slice()
//     headers[index][0] = event.target.value

//     this.setState({headers})
//   }

//   updateValue(event, index) {
//     const headers = this.state.headers.slice()
//     headers[index][1] = event.target.value

//     this.setState({headers})
//   }

//   componentWillUpdate() {
//     const last = this.state.headers[this.state.headers.length - 1]
//     if (last[0]) this.state.headers.push(['', ''])

//     for (let i = 0; i < this.state.headers.length - 1; i++) {
//       const [key, value] = this.state.headers[i]
//       if (!key && !value) this.state.headers.splice(i, 1)
//     }
//   }

//   render() {
//     return (
//       <div>
//         {
//           this.state.headers.map((header, index) => (
//             <div>
//               <input value={header[0]} onInput={e => this.updateKey(e, index)} />
//               <input value={header[1]} onInput={e => this.updateValue(e, index)} />
//             </div>
//           ))
//         }
//         <HexDump headers={this.state.headers} />
//       </div>
//     )
//   }
// }

// class HexDump extends React.Component {
//   render() {
//     const {headers} = this.props
//     const table = new IndexTable()

//     const sections = []
//     for (let i = 0; i < headers.length; i++) {
//       const name = headers[i][0]
//       const value = headers[i][1]
//       if (!name || !value) continue

//       sections.push(
//         <ByteSegment
//           name={name}
//           value={value}
//           bytes={header(name, value, table)} />
//       )
//     }

//     return (
//       <div>
//         {sections}
//       </div>
//     )
//   }
// }

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
    return this.state.headers.map(([name, value], index) =>
      <div>
        <div>
          <input value={name} onInput={e => this.updateName(e, index)} />
          <input value={value} onInput={e => this.updateValue(e, index)} />
        </div>
      </div>
    )
  }
}

class ByteSegment extends React.PureComponent {
  render() {
    return (
      <div>
        <div>{this.props.name}</div>
        <div>{this.props.value}</div>
        <div>{JSON.stringify(this.props.bytes)}</div>
      </div>
    )
  }
}

ReactDOM.render(<Headers />, document.getElementById("app"))
