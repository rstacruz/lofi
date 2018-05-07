/* @flow */
import { Container } from 'unstated'
import type { Action, PlayerStatus, SoundcloudSound } from '../types'

const debug = require('debug')('app:SoundcloudStore')

export type State = {
  state: PlayerStatus,
  sounds: ?Array<SoundcloudSound>,
  sound: ?SoundcloudSound,
  actions: Array<Action>
}

/**
 * Store
 */

export default class SoundcloudStore extends Container<State> {
  state = {
    state: 'PENDING', // 'READY' | 'PLAYING' | 'PAUSED'
    // The playlist
    sounds: null,
    // The current song
    sound: null,
    // Actions to be passed onto SoundCloud
    actions: []
  }

  reset () {
    this.setState({ state: 'PENDING', sounds: null, sound: null, actions: [] })
  }

  setPlayerState (state: PlayerStatus) {
    if (this.state.state === state) {
      debug('setPlayerState() ERR: Discarding conguent state', state)
      return
    }

    debug('setPlayerState() OK:', state)
    this.setState({ state })
  }

  setSounds (sounds: Array<SoundcloudSound>) {
    this.setState({ sounds })
  }

  setSound (sound: SoundcloudSound) {
    if (JSON.stringify(sound) === JSON.stringify(this.state.sound)) {
      debug('setSound() ERR: Discarding congruent sound', sound)
      return
    }

    debug('setSound() OK:', sound.user && sound.user.username, '-', sound.title)

    this.setState({ sound })
    // csound.permalink_url
    // csound.artwork_url
    // csound.description
    // csound.title
  }

  play () {
    this.setState({ actions: [{ type: 'PLAY' }] })
  }

  pause () {
    this.setState({ actions: [{ type: 'PAUSE' }] })
  }

  next () {
    this.setState({ actions: [{ type: 'NEXT' }] })
  }
}
