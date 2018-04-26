import React from 'react'
import { Subscribe } from 'unstated'
import SoundcloudStore from '../stores/SoundcloudStore'
import cn from 'classnames'

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
      />
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
      .button::before {
        box-sizing: border-box;
      }

      .button {
        width: 29px;
        height: 16px;
        border-radius: 12px;
        background-color: ${BACKGROUND_COLOR};
        box-shadow: inset 0 0 0 1px ${INACTIVE_COLOR},
          0 0 0 1px ${INACTIVE_COLOR};
        position: relative;
        display: inline-block;
        transition: background-color 300ms ease-out, border-color 300ms ease-out,
          box-shadow 300ms ease-out;
        cursor: pointer;
        box-sizing: border-box;
      }

      .button,
      .button:focus,
      .button:active {
        outline: 0;
      }

      /* Peg */
      .button::before {
        content: '';
        display: block;
        width: 10px;
        height: 10px;
        background-color: ${INACTIVE_COLOR};
        position: absolute;
        left: 3px;
        top: 3px;
        border-radius: 50%;
        transition: background-color 300ms ease-out, transform 300ms ease-out;
        box-sizing: border-box;
      }

      .button.-pause {
        background: ${ACTIVE_COLOR};
        border-color: ${BACKGROUND_COLOR};
        box-shadow: inset 0 0 0 0 transparent, 0 0 0 0 transparent;
      }

      .button.-pause::before {
        transform: translate3d(12px, 0, 0);
        background: ${BACKGROUND_COLOR};
      }
    `}</style>
  </div>
)

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
        isPaused={
          soundcloud.state.state === 'READY' ||
          soundcloud.state.state === 'PAUSED'
        }
        isPending={soundcloud.state.state === 'PENDING'}
        isPlaying={soundcloud.state.state === 'PLAYING'}
      />
    )}
  </Subscribe>
)

/*
 * Export
 */

export default connect(MediaControlsView)
