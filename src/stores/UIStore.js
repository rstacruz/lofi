/* @flow */
import { Container } from 'unstated'

export type State = {
  showSoundcloud: boolean
}

/**
 * Store that has UI state
 */

export default class UIStore extends Container<State> {
  state = {
    showSoundcloud: false
  }

  setSoundcloud (value: boolean) {
    this.setState({ showSoundcloud: value })
  }

  toggleSoundcloud () {
    this.setState({ showSoundcloud: !this.state.showSoundcloud })
  }
}
