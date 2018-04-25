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
    sound: null
  }

  setPlayerState(state) {
    this.setState({ state })
  }

  setSounds(sounds) {
    this.setState({ sounds })
  }

  setSound(sound) {
    this.setState({ sound })
    // csound.permalink_url
    // csound.artwork_url
    // csound.description
    // csound.title
    console.log('NP:', sound.user && sound.user.username, '-', sound.title)
  }
}