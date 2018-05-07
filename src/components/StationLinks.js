/* @flow */
import React from 'react'

import StationLinksView from './StationLinksView'
import type { StationPage } from '../types/index'

/*
 * Types
 */

export type Props = {
  stations: Array<StationPage>,
  isOpen?: boolean
}

export type State = {
  isOpen: boolean
}

/**
 * Connector component
 */

export class StationLinks extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      isOpen: 'isOpen' in props ? props.isOpen || false : false
    }
  }

  toggleOpen = () => {
    const { isOpen } = this.state
    this.setState({ isOpen: !isOpen })
  }

  onOpen = () => {
    this.setState({ isOpen: true })
  }

  onClose = () => {
    this.setState({ isOpen: false })
  }

  render () {
    const { props, onOpen, onClose } = this
    const { isOpen } = this.state

    return (
      <StationLinksView
        {...props}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
    )
  }
}

/*
 * Export
 */

export default StationLinks
