import React from 'react'
import PlayerPage from '../components/PlayerPage'

/**
 * Home page
 */

export const IndexPage = () => (
  <PlayerPage
    title={'Lofi Beats'}
    soundcloudURL={'https://api.soundcloud.com/playlists/246258956'}
  />
)

/*
 * Export
 */

export default IndexPage
