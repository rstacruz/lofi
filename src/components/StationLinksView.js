/* @flow */
import React from 'react'
import cn from 'classnames'

import StationLink from './StationLink'
import type { StationPage } from '../types/index'

/*
 * Types
 */

export type Props = {
  stations: Array<StationPage>,
  isOpen: boolean,
  onOpen: () => void,
  onClose: () => void
}

/**
 * Station Links View
 */

export const StationLinksView = ({
  stations,
  isOpen,
  onOpen,
  onClose
}: Props) => (
  <div className='StationLinks'>
    <div className={cn('list', { '-opened': isOpen, '-closed': !isOpen })}>
      {stations.map(({ path, title }: StationPage) => (
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

/*
 * Export
 */

export default StationLinksView
