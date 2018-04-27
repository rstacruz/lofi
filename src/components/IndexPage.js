/* @flow */
import React from 'react'
import StationLinks from './StationLinks'

/*::
  import type { PageList } from '../types'
*/

export const IndexPage = ({ pages } /*: { pages: PageList } */) => (
  <StationLinks pages={pages} />
)

export default IndexPage
