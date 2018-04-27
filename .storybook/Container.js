import React, { Component } from 'react'

export default class Container extends Component {
  render() {
    const { story } = this.props

    return (
      <div
        role="main"
        style={{
          margin: '3em 3em',
          minWidth: '120px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {story()}
      </div>
    )
  }
}
