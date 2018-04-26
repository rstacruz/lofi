import React from 'react'
import PlayerPage from '../components/PlayerPage'

/**
 * Home page
 * See: https://soundcloud.com/jessinneijts/sets/timewriter-lazy-sundays
 */

export const IndexPage = () => (
  <PlayerPage
    soundcloudURL={'https://api.soundcloud.com/playlists/109759947'}
  />
)

/*
 * Export
 */

export default IndexPage
