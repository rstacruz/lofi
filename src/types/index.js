/* @flow */

export type StationGroup = 'lofi' | 'electronic'

export type Station = {|
  default?: boolean,
  title: string,
  group: StationGroup,
  genre: ?string,
  href: string,
  soundcloudURL: string
|}

export type StationList = {
  [string]: Station
}

// As given by all_stations.js
export type StationPage = {|
  default?: boolean,
  title: string,
  group: StationGroup,
  genre: ?string,
  href: string,
  soundcloudURL: string,
  path: string
|}

export type Action = {
  type: string
}

// `window.SC`
export type SoundcloudAPI = any

export type SoundcloudSound = {
  title: string,
  user?: {
    username: string
  }
}

// The return of `SC.widget(iframe)`
export type SoundcloudWidget = {
  play: () => void,
  pause: () => void,
  bind: (any, () => void) => void,
  getSounds: ((any) => void) => void,
  skip: number => void,
  getCurrentSound: ((?SoundcloudSound) => void) => void
}

export type PlayerStatus = 'PENDING' | 'READY' | 'PLAYING' | 'PAUSED'

// Possible UI actions for keymaps
export type UIAction = 'ui.toggleSoundcloud' | 'media.playPause'

// KeyMap for hotkeys
export type KeyMap = {
  [UIAction]: string
}
