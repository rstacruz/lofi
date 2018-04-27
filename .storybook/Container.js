import React, { Component } from 'react'
import { createMemoryHistory as createHistory } from 'history'
import { Router } from 'react-router'

export default class Container extends Component {
  render() {
    const { story } = this.props
    const history = createHistory()

    return (
      <div
        role="main"
        style={{
          margin: '3em 3em',
          minWidth: '120px'
        }}
      >
        <Router history={history}>{story()}</Router>
      </div>
    )
  }
}
