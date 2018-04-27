import React from 'react'
import { Subscribe } from 'unstated'
import SoundcloudStore from '../stores/SoundcloudStore'
import cn from 'classnames'
import color from 'color'
import Type from 'prop-types'

export const INACTIVE_COLOR = '#fff'
export const ACTIVE_COLOR = '#8fa'
export const BACKGROUND_COLOR = '#111'

/**
 * Media controls
 */

export const MediaControlsView = ({
  onPlay,
  onPause,
  isPaused,
  isPending,
  isPlaying
}) => (
  <div className='MediaControls'>
    {isPending ? <span className='loading'>Loading...</span> : null}
    {isPaused || isPlaying ? (
      <button
        className={cn('button', { '-play': isPaused, '-pause': isPlaying })}
        onClick={isPaused ? onPlay : onPause}
      >
        <span className='peg' />
      </button>
    ) : null}

    <style jsx>{`
      .MediaControls {
        position: relative;
        display: inline-block;
      }

      .loading {
        font-size: 0.86em;
        text-transform: uppercase;
        opacity: 0.5;
      }

      .button,
      .peg {
        box-sizing: border-box;
      }

      .button {
        border: 0;
        width: 29px;
        height: 16px;
        border-radius: 12px;
        background-color: ${BACKGROUND_COLOR};
        box-shadow: 0 0 0 2px ${INACTIVE_COLOR};
        position: relative;
        display: inline-block;
        transition: background-color 300ms ease-out, box-shadow 300ms ease-out;
        cursor: pointer;
        box-sizing: border-box;
      }

      .button,
      .button:focus,
      .button:active {
        outline: 0;
      }

      /* Peg */
      .peg {
        position: absolute;
        left: 3px;
        top: 3px;
        transition: transform 300ms ease-out;
        box-sizing: border-box;
      }

      .peg::before {
        content: '';
        display: block;
        width: 10px;
        height: 10px;
        background-color: ${INACTIVE_COLOR};
        border-radius: 50%;
        transition: background-color 1200ms ease-out, box-shadow 1200ms ease-out;
      }

      /* (On) container */
      .button.-pause {
        background: ${BACKGROUND_COLOR};
        box-shadow: 0 0 1px 1px ${color(ACTIVE_COLOR).fade(0.9)};
      }

      /* (On) peg */
      .button.-pause .peg {
        transform: translate3d(12px, 0, 0);
      }

      .button.-pause .peg::before {
        background: ${ACTIVE_COLOR};
        box-shadow: 0 0 16px 2px ${ACTIVE_COLOR};
        animation: pulse 1200ms ease-out infinite alternate-reverse;
      }

      @keyframes pulse {
        0% {
          transform: scale(1);
        }

        100% {
          transform: scale(0.5);
        }
      }
    `}</style>
  </div>
)

MediaControlsView.propTypes = {
  onPlay: Type.func,
  onPause: Type.func,
  isPaused: Type.bool,
  isPending: Type.bool,
  isPlaying: Type.bool
}

/**
 * Connector
 */

export const connect = View => () => (
  <Subscribe to={[SoundcloudStore]}>
    {soundcloud => (
      <View
        onPlay={() => {
          soundcloud.play()
        }}
        onPause={() => {
          soundcloud.pause()
        }}
        isPaused={soundcloud.state.state === 'PAUSED'}
        isPending={
          soundcloud.state.state === 'PENDING' ||
          soundcloud.state.state === 'READY'
        }
        isPlaying={soundcloud.state.state === 'PLAYING'}
      />
    )}
  </Subscribe>
)

/*
 * Export
 */

export default connect(MediaControlsView)
