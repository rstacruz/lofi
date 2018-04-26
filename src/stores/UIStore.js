import { Container } from 'unstated'

/**
 * Store that has UI state
 */

export default class UIStore extends Container {
  state = {
    showSoundcloud: false
  }

  setSoundcloud (value) {
    this.setState({ showSoundcloud: value })
  }

  toggleSoundcloud () {
    this.setState({ showSoundcloud: !this.state.showSoundcloud })
  }
}
