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
      auto_play: true,
      buying: false,
      liking: false,
      download: false,
      sharing: false,
      show_artwork: false,
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

    return (
      <div className="soundcloud-area">
        {store.state.state === 'PENDING' ? (
          <span style={{ color: '#888' }}>Loading...</span>
        ) : null}
        {store.state.state === 'READY' || store.state.state === 'PAUSED' ? (
          <button onClick={this.play}>Play</button>
        ) : null}

        {store.state.state === 'PLAYING' ? (
          <button onClick={this.pause}>Pause</button>
        ) : null}

        {iframe}
      </div>
    )
  }

  componentDidMount() {
    getSoundcloud().then(SC => {
      this.setState({ SC })
    })
  }

  refIframe = el => {
    this.iframe = el

    const { widget, SC } = this.getAPI()
    const { store } = this.props

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

  play = () => {
    const { widget } = this.getAPI()
    widget.play()
  }

  pause = () => {
    const { widget } = this.getAPI()
    widget.pause()
  }

  next = () => {
    const { widget } = this.getAPI()
    widget.next()
  }
}

export const IndexPage = () => (
  <Subscribe to={[SoundcloudStore]}>
    {soundcloud => (
      <div>
        <MediaPlayer store={soundcloud} />
      </div>
    )}
  </Subscribe>
)

export default IndexPage
