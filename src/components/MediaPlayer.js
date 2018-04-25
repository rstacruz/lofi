import React from 'react'
import qs from 'qs'
import { Subscribe } from 'unstated'
import getSoundcloud from '../../lib/soundcloud'
import SoundcloudStore from '../stores/SoundcloudStore'

/**
 * Soundcloud player iframe.
 *
 * See: https://developers.soundcloud.com/docs/api/html5-widget
 */

export class MediaPlayer extends React.Component {
  state = {}

  render () {
    const { SC } = this.state

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
        allow='autoplay'
        width='100%'
        height='465'
        scrolling='no'
        frameBorder='no'
        src={url}
      />
    )

    if (!SC) return null
    return iframe
  }

  componentDidMount () {
    getSoundcloud().then(SC => {
      this.setState({ SC })
    })
  }

  /**
   * Passes down `actions` from the store to the SoundCloud widget API.
   */

  /* eslint-disable camelcase */
  UNSAFE_componentWillReceiveProps (next) {
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
    const { dispatch } = this.props

    // Save widget to state
    this.setState({ widget })

    this.bindWidgetEvents(widget, dispatch, SC)
  }

  /**
   * Initializes the Soundcloud widget. Hooks Soundcloud events to `dispatch`.
   */

  bindWidgetEvents = (widget, dispatch, SC) => {
    widget.bind(SC.Widget.Events.READY, () => {
      dispatch.setPlayerState('READY')

      widget.getSounds(sounds => {
        dispatch.setSounds(sounds)

        // Skip to random track on startup
        const idx = Math.round(sounds.length * Math.random())
        widget.skip(idx)
      })

      widget.bind(SC.Widget.Events.PLAY, () => {
        dispatch.setPlayerState('PLAYING')

        widget.getCurrentSound(sound => {
          dispatch.setSound(sound)
        })
      })

      widget.bind(SC.Widget.Events.PAUSE, () => {
        dispatch.setPlayerState('PAUSED')
      })

      widget.bind(SC.Widget.Events.FINISH, () => {
        dispatch.setPlayerState('FINISH')
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

/**
 * Place this anywhere in your DOM tree. It listens to Soundcloud store.
 */

export default () => {
  return (
    <Subscribe to={[SoundcloudStore]}>
      {soundcloud => (
        <MediaPlayer dispatch={soundcloud} actions={soundcloud.state.actions} />
      )}
    </Subscribe>
  )
}
