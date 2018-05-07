/* @flow */
import * as React from 'react'
import { Subscribe } from 'unstated'
import SoundcloudStore from '../stores/SoundcloudStore'
import cn from 'classnames'
import color from 'color'
import Type from 'prop-types'

export const INACTIVE_COLOR = '#fff'
export const ACTIVE_COLOR = '#8fa'
export const BACKGROUND_COLOR = '#1e1e24'
export const HEIGHT = 20
export const WIDTH = 40

/*
 * Types
 */

export type ViewProps = {|
  onPlay: () => void,
  onPause: () => void,
  isPaused: boolean,
  isPending: boolean,
  isPlaying: boolean
|}

/**
 * Media controls
 */

export const MediaControlsView = ({
  onPlay,
  onPause,
  isPaused,
  isPending,
  isPlaying
}: ViewProps) => (
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
        width: ${WIDTH}px;
        height: ${HEIGHT}px;
        border-radius: ${HEIGHT}px;
        position: relative;
        display: inline-block;
        transition: background-color 300ms ease-out, box-shadow 300ms ease-out;
        cursor: pointer;
        box-sizing: border-box;
      }

      /* Track */
      .button::before {
        content: '';
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: ${HEIGHT}px;
        background-color: ${BACKGROUND_COLOR};
        box-shadow: 0 0 0 2px ${INACTIVE_COLOR};
        transition: transform 300ms ease-out, box-shadow 150ms ease-out;
      }

      .button,
      .button:focus,
      .button:active {
        outline: 0;
      }

      /* Peg */
      .peg {
        position: absolute;
        z-index: 5;
        left: 3px;
        top: 3px;
        transition: transform 300ms ease-out;
        box-sizing: border-box;
      }

      .peg::before {
        content: '';
        display: block;
        width: ${HEIGHT - 6}px;
        height: ${HEIGHT - 6}px;
        background-color: ${INACTIVE_COLOR};
        border-radius: 50%;
        transition: background-color 1200ms ease-out, box-shadow 1200ms ease-out;
      }

      /* (On) container */
      .button.-pause {
        background: transparent;
        box-shadow: 0 0 0 0 ${BACKGROUND_COLOR};
      }

      /* (On) track */
      .button.-pause::before {
        box-shadow: 0 0 0 0 ${BACKGROUND_COLOR};
        transform: scale(0.5);
      }

      /* (On) peg */
      .button.-pause .peg {
        transform: translate3d(${WIDTH - HEIGHT}px, 0, 0);
      }

      .button.-pause .peg::before {
        background: ${ACTIVE_COLOR};
        box-shadow: 0 0 16px 2px ${ACTIVE_COLOR},
          0 0 32px 2px ${color(ACTIVE_COLOR).rotate(50)};
        animation: pulse 2400ms cubic-bezier(0.07, 0.8, 0.12, 0.9) infinite;
      }

      @keyframes pulse {
        0% {
          transform: scale(0.8);
        }

        98% {
          transform: scale(0.3);
        }

        100% {
          transform: scale(0.8);
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

export const connect = (View: ViewProps => React.Node) => () => (
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
