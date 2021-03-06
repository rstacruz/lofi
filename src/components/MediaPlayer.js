/* @flow */
/* eslint-disable react/no-unused-prop-types */
import React from 'react'
import qs from 'qs'
import { Subscribe } from 'unstated'

import getSoundcloud from '../../lib/soundcloud'
import SoundcloudStore from '../stores/SoundcloudStore'

import type { Action, SoundcloudAPI, SoundcloudWidget } from '../types'

/*
 * Types
 */

export type Props = {|
  url: string,
  actions: Array<Action>,
  dispatch: any
|}

export type State = {
  SC?: SoundcloudAPI,
  widget?: SoundcloudWidget
}

export type ViewProps = {|
  url: string,
  dispatch: any,
  actions: any
|}

const debug = require('debug')('app:MediaPlayer')

/**
 * Soundcloud player iframe.
 *
 * See: https://developers.soundcloud.com/docs/api/html5-widget
 */

export class MediaPlayerView extends React.Component<Props, State> {
  state: State = {}

  iframe: ?global.Node

  render () {
    const { SC } = this.state
    const { url } = this.props

    const options = {
      url,
      auto_play: true,
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

    const src = `https://w.soundcloud.com/player/?${qs.stringify(options)}`

    const iframe = (
      <iframe
        ref={this.refIframe}
        allow='autoplay'
        width='100%'
        height='100%'
        scrolling='no'
        frameBorder='no'
        src={src}
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
  UNSAFE_componentWillReceiveProps (next: Props) {
    // If no widget, die
    const { widget } = this.state
    if (!widget) return

    const prev = this.props

    const actions = next.actions
    const prevActions = prev.actions

    if (actions !== prevActions && actions.length) {
      actions.map(action => {
        if (action.type === 'PLAY') {
          widget.play()
        } else if (action.type === 'PAUSE') {
          widget.pause()
        }
      })
    }
  }

  /**
   * Initializes the `<iframe />`.
   */

  refIframe = (el: ?global.Node) => {
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

  bindWidgetEvents = (
    widget: SoundcloudWidget,
    dispatch: any,
    SC: SoundcloudAPI
  ) => {
    // Can happen in development.
    if (!widget) {
      console.warn('Warning: Soundcloud widget not available')
      return
    }

    widget.bind(SC.Widget.Events.READY, () => {
      dispatch.setPlayerState('READY')

      widget.getSounds(sounds => {
        dispatch.setSounds(sounds)

        // Skip to random track on startup
        const idx = Math.round(sounds.length * Math.random())
        widget.skip(idx)

        widget.bind(SC.Widget.Events.PLAY, () => {
          debug('INFO: Events.PLAY received')
          dispatch.setPlayerState('PLAYING')

          widget.getCurrentSound(sound => {
            // Discard empty "plays"
            if (!sound) {
              debug('ERR: discarding empty sound')
              return
            }

            if (!sound.title && !(sound.user && sound.user.username)) {
              debug('ERR: discarding incomplete sound', sound)
              return
            }

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

export const MediaPlayer = ({ url }: Props) => {
  return (
    <Subscribe to={[SoundcloudStore]}>
      {soundcloud => (
        <MediaPlayerView
          url={url || 'https://api.soundcloud.com/playlists/246258956'}
          dispatch={soundcloud}
          actions={soundcloud.state.actions}
        />
      )}
    </Subscribe>
  )
}

/*
 * Export
 */

export default MediaPlayer
