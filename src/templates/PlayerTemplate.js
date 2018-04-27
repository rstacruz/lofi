import React from 'react'
import PlayerPage from '../components/PlayerPage'

/*
 * Template for player pages
 */

export const PlayerTemplate = ({ pathContext: ctx }) => {
  // const { title, href, soundcloudURL } = ctx
  return <PlayerPage {...ctx} />
}

/*
 * Export
 */

export default PlayerTemplate
