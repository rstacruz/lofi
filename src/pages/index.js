import React from 'react'
import Link from 'gatsby-link'
import qs from 'qs'
import getSoundcloud from '../../lib/soundcloud'
import { Subscribe } from 'unstated'
import SoundcloudStore from '../stores/SoundcloudStore'

/**
 * Soundcloud player thing
 *
 * See: https://developers.soundcloud.com/docs/api/html5-widget
 */

export class MediaPlayer extends React.Component {
  state = {}

  render() {
    const { SC } = this.state
    const { store } = this.props

    const options = {
      url: 'https://api.soundcloud.com/playlists/246258956',
      auto_play: false,
      buying: false,
      liking: false,
      download: false,
      sharing: false,
      show_artwork: true,
      show_comments: false,
      show_playcount: false,
      show_teaser: true,
      show_user: false,
      hide_related: false
      // visual: false,
      // callback: true
    }

    const url = `https://w.soundcloud.com/player/?${qs.stringify(options)}`

    const iframe = (
      <iframe
        ref={this.refIframe}
        allow="autoplay"
        width="100%"
        height="465"
        scrolling="no"
        frameBorder="no"
        src={url}
      />
    )

    if (!SC) return null
    return iframe
  }

  componentDidMount() {
    getSoundcloud().then(SC => {
      this.setState({ SC })
    })
  }

  /**
   * Passes down `actions` from the store to the SoundCloud widget API.
   */

  UNSAFE_componentWillReceiveProps(next) {
    const prev = this.props

    const actions = next.actions
    const prevActions = prev.actions

    if (actions !== prevActions && actions.length) {
      actions.map(action => {
        if (action.type === 'PLAY') {
          this.state.widget.play()
        } else if (action.type === 'PAUSE') {
          this.state.widget.pause()
        }
      })
    }
  }

  /**
   * Initializes the `<iframe />`.
   */

  refIframe = el => {
    this.iframe = el

    const { widget, SC } = this.getAPI()
    const { store } = this.props

    // Save widget to state
    this.setState({ widget })

    widget.bind(SC.Widget.Events.READY, () => {
      store.setPlayerState('READY')

      widget.getSounds(sounds => {
        store.setSounds(sounds)
        // Skip to random track
        const idx = Math.round(sounds.length * Math.random())
        widget.skip(idx)
      })

      widget.bind(SC.Widget.Events.PLAY, () => {
        store.setPlayerState('PLAYING')

        widget.getCurrentSound(sound => {
          store.setSound(sound)
        })
      })

      widget.bind(SC.Widget.Events.PAUSE, () => {
        store.setPlayerState('PAUSED')
      })

      widget.bind(SC.Widget.Events.FINISH, () => {
        // Is this right?
        store.setPlayerState('FINISH')
      })
    })
  }

  /**
   * Returns the `widget` and `SC` objects.
   */

  getAPI = () => {
    const { iframe } = this
    if (!iframe) return {}

    const { SC } = this.state
    if (!SC) return {}

    const widget = SC.Widget(iframe)
    return { widget, SC }
  }
}

export const IndexPage = () => (
  <Subscribe to={[SoundcloudStore]}>
    {soundcloud => (
      <div>
        {soundcloud.state.state === 'PENDING' ? (
          <span style={{ color: '#888' }}>Loading...</span>
        ) : null}
        {soundcloud.state.state === 'READY' ||
        soundcloud.state.state === 'PAUSED' ? (
          <button
            onClick={() => {
              soundcloud.play()
            }}
          >
            Play
          </button>
        ) : null}

        {soundcloud.state.state === 'PLAYING' ? (
          <button
            onClick={() => {
              soundcloud.pause()
            }}
          >
            Pause
          </button>
        ) : null}

        <div className="soundcloud-area">
          <MediaPlayer store={soundcloud} actions={soundcloud.state.actions} />
        </div>
      </div>
    )}
  </Subscribe>
)

export default IndexPage
