import React from 'react'
import Link from 'gatsby-link'
import { Subscribe } from 'unstated'
import SoundcloudStore from '../stores/SoundcloudStore'
import MediaPlayer from '../components/MediaPlayer'

/**
 * Home page
 */

export const IndexPage = () => (
  <div class="IndexPage">
    <MediaControls />

    <div className="soundcloud-area">
      <MediaPlayer />
    </div>
  </div>
)

/**
 * Media controls
 */

export const MediaControls = () => (
  <Subscribe to={[SoundcloudStore]}>
    {soundcloud => (
      <div className="MediaControls">
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
      </div>
    )}
  </Subscribe>
)

/*
 * Export
 */

export default IndexPage
