/* @flow */
import React from 'react'
import StationLinks from './StationLinks'

/*::
  import type { StationList } from '../types'

  export type Props = {
    stations: StationList
  }
*/

export const IndexPage = ({ stations } /*: Props */) => (
  <StationLinks stations={stations} isOpen />
)

export default IndexPage
