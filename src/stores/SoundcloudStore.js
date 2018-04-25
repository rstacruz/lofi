import { Container } from 'unstated'

/**
 * Store
 */

export default class SoundcloudStore extends Container {
  state = {
    state: 'PENDING', // 'READY' | 'PLAYING' | 'PAUSED'
    // The playlist
    sounds: null,
    // The current song
    sound: null,
    // Actions to be passed onto SoundCloud
    actions: []
  }

  setPlayerState(state) {
    console.log('setPlayerState()', state)
    if (this.state.state === state) return
    this.setState({ state })
  }

  setSounds(sounds) {
    this.setState({ sounds })
  }

  setSound(sound) {
    console.log(
      'setSound()',
      sound.user && sound.user.username,
      '-',
      sound.title
    )
    this.setState({ sound })
    // csound.permalink_url
    // csound.artwork_url
    // csound.description
    // csound.title
  }

  play() {
    this.setState({ actions: [{ type: 'PLAY' }] })
  }

  pause() {
    this.setState({ actions: [{ type: 'PAUSE' }] })
  }

  next() {
    this.setState({ actions: [{ type: 'NEXT' }] })
  }
}
