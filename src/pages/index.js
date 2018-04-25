import React from 'react'
import Link from 'gatsby-link'
import { Subscribe } from 'unstated'
import SoundcloudStore from '../stores/SoundcloudStore'
import MediaPlayer from '../components/MediaPlayer'
import GifSlideshow from '../components/GifSlideshow'

/**
 * Home page
 */

export const IndexPage = () => (
  <div className="IndexPage" style={{ height: '100%' }}>
    <div className="IndexLayout" style={{ height: '100%' }}>
      <div className="controls">
        <MediaControls />
      </div>

      <div className="slideshow">
        <Subscribe to={[SoundcloudStore]}>
          {soundcloud =>
            soundcloud.state.state === 'PLAYING' ||
            soundcloud.state.state === 'FINISHED' ? (
              <GifSlideshow />
            ) : null
          }
        </Subscribe>
      </div>

      <div className="soundcloud">
        <MediaPlayer />
      </div>
    </div>
    <style jsx>{`
      .IndexLayout {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }

      .slideshow {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }

      .controls {
        position: absolute;
        bottom: 16px;
        left: 16px;
        z-index: 1;
      }

      .soundcloud {
        position: absolute;
        max-width: 300px;
        top: 16px;
        right: 16px;
        bottom: 16px;
        opacity: 0;
        z-index: 1;
      }

      .soundcloud:hover {
        opacity: 1;
      }
    `}</style>
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
