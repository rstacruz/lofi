/* @flow */
import type { StationList } from '../types'

/**
 * Stations
 */

const STATIONS: StationList = {
  '/lofi-hiphop': {
    title: 'Lofi Beats',
    genre: 'Hiphop',
    group: 'lofi',
    href: 'https://soundcloud.com/parzival6/sets/lo-fi-hip-hop',
    soundcloudURL: 'https://api.soundcloud.com/playlists/246258956'
  },
  '/future-funk': {
    title: 'Future Funk',
    genre: 'Funk',
    group: 'lofi',
    href: 'https://soundcloud.com/seki13/sets/vaporwave-future-funk',
    soundcloudURL: 'https://api.soundcloud.com/playlists/248817284'
  },
  '/vhs-dreams': {
    title: 'VHS Dreams',
    genre: 'Synthpop',
    group: 'lofi',
    href: 'https://soundcloud.com/user-231461939/sets/kaimyros-vaporwave-mix',
    soundcloudURL: 'https://api.soundcloud.com/playlists/335930552'
  },
  '/morning-bliss': {
    title: 'Morning Bliss',
    genre: 'Indie',
    group: 'electronic',
    href:
      'https://soundcloud.com/user-876658341/sets/sunday-morning-kisses-and',
    soundcloudURL: 'https://api.soundcloud.com/playlists/424032182'
  }
  // '/timewriter': {
  //   title: 'Lazy Sundays',
  //   genre: 'Tech House',
  //   group: 'electronic',
  //   href: 'https://soundcloud.com/jessinneijts/sets/timewriter-lazy-sundays',
  //   soundcloudURL: 'https://api.soundcloud.com/playlists/109759947'
  // },
  // '/mushroom-jazz': {
  //   title: 'Mushroom Jazz',
  //   href: 'https://soundcloud.com/djmarkfarina/sets/mushroom-jazz-mixes',
  //   soundcloudURL: 'https://api.soundcloud.com/playlists/309781662'
  // },
  // '/worldwide-fm': {
  //   title: 'Worldwide FM',
  //   genre: 'Electronic',
  //   group: 'electronic',
  //   href:
  //     'https://soundcloud.com/worldwide-fm/sets/new-music-worldwide-guest-mixes',
  //   soundcloudURL: 'https://api.soundcloud.com/playlists/331692615'
  // },
  // '/mojo-essentials': {
  //   title: 'Mojo Essentials',
  //   genre: 'Soul/Jazz',
  //   group: 'lofi',
  //   href: 'https://soundcloud.com/mojo_club/sets/essentials',
  //   soundcloudURL: 'https://api.soundcloud.com/playlists/230735978'
  // }
}

/*
 * Default export
 */

module.exports = STATIONS
