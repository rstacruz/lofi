/* @flow */
import React from 'react'
import StationLinks from './StationLinks'

/*::
  import type { StationPage } from '../types'

  export type Props = {
    stations: Array<StationPage>
  }
*/

export const IndexPage = ({ stations } /*: Props */) => (
  <StationLinks stations={stations} isOpen />
)

export default IndexPage
