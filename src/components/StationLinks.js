/* @flow */
import React from 'react'
import cn from 'classnames'

import StationLink from './StationLink'

/*::
  import type { Station, StationList } from '../types/index'

  export type Props = {
    stations: StationList,
    isOpen?: boolean
  }

  export const State = {
    isOpen: boolean
  }

  export type ViewProps = {
    stations: StationList,
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void
  }
*/

export const StationLinksView = (
  { stations, isOpen, onOpen, onClose } /*: ViewProps */
) => (
  <div className='StationLinks'>
    <div className={cn('list', { '-opened': isOpen, '-closed': !isOpen })}>
      {stations.map(({ path, title } /*: Station */) => (
        <StationLink key={path} {...{ path, title }} />
      ))}
    </div>

    <button
      className={cn('toggle', { '-opened': isOpen, '-closed': !isOpen })}
      onClick={isOpen ? onClose : onOpen}
    />

    <style jsx>{`
      .StationLinks {
        padding: 16px;
        width: 100%;
      }

      .list {
        transition: opacity 300ms linear, transform 300ms ease-out;
        max-height: 50vh;
        overflow-y: auto;
      }

      .list.-closed {
        opacity: 0;
        pointer-events: none;
        transform: translate3d(0, 32px, 0);
      }

      .list.-opened {
        opacity: 1;
        pointer-events: auto;
        transform: translate3d(0, 0, 0);
      }

      .toggle {
        border: 0;
        padding: 8px;
        display: block;
        text-align: center;
        cursor: pointer;
        width: 100%;
        border-radius: 3px;
        margin-top: 16px;
      }

      .toggle:focus,
      .toggle:hover {
        outline: 0;
      }

      .toggle:hover {
        opacity: 1;
      }

      .toggle::before {
        content: '';
        display: inline-block;
        width: 12px;
        height: 12px;
        border-left: solid 1px white;
        border-top: solid 1px white;
        transform: rotate(45deg) translate3d(3px, 3px, 0);
        transition: transform 300ms ease-out, opacity 300ms linear;
        opacity: 0.9;
      }

      .toggle.-opened::before {
        transform: rotate(225deg) translate3d(1px, 1px, 0);
        opacity: 1;
      }
    `}</style>
  </div>
)

/**
 * Connector component
 */

export class StationLinks extends React.Component /*:: <Props, State> */ {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: 'isOpen' in props ? props.isOpen : false
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
