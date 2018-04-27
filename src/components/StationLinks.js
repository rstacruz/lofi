/* @flow */
import React from 'react'
import StationLink from './StationLink'

/*::
  import type { PageList } from '../types'
*/

export const StationLinks = ({ pages } /*: { pages: PageList } */) => (
  <div className='StationLinks'>
    {pages.map(({ path, title } /*: Page */) => (
      <StationLink key={path} {...{ path, title }} />
    ))}

    <style jsx>{`
      .StationLinks {
        padding: 64px;
      }
    `}</style>
  </div>
)

/*
 * Export
 */

export default StationLinks
