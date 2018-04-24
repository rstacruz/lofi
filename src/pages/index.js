import React from 'react'
import Link from 'gatsby-link'
import qs from 'qs'
import getSoundcloud from '../../lib/soundcloud'

/**
 * Soundcloud player thing
 */

export class MediaPlayer extends React.Component {
  state = {}

  render() {
    const { SC } = this.state

    // <iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay"
    // src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/246258956&color=%23ff5500&auto_play=true&
    // hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>

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
      hide_related: false,
      start_track: Math.round(447 * Math.random())
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
        <button onClick={this.play}>Play</button>
        <button onClick={this.next}>Next</button>
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

    widget.bind(SC.Widget.Events.READY, () => {
      widget.bind(SC.Widget.Events.PLAY, () => {
        widget.getCurrentSound(csound => {
          // csound.permalink_url
          // csound.artwork_url
          // csound.description
          // csound.title
          console.log('csoud', csound)
        })
      })
      widget.play()
    })
  }

  getAPI = () => {
    const { iframe } = this
    if (!iframe) return {}

    const { SC } = this.state
    if (!SC) return {}

    const widget = SC.Widget(iframe)
    return { widget, SC }
  }

  play = () => {
    const { widget, SC } = this.getAPI()
    widget.play()
  }

  next = () => {
    const { widget, SC } = this.getAPI()
    widget.next()
  }
}

export const IndexPage = () => (
  <div>
    <MediaPlayer />
  </div>
)

export default IndexPage
