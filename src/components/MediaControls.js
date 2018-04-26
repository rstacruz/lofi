import React from 'react'
import { Subscribe } from 'unstated'
import SoundcloudStore from '../stores/SoundcloudStore'

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
    {isPending ? <span>Loading...</span> : null}
    {isPaused ? <button onClick={onPlay}>Play</button> : null}
    {isPlaying ? <button onClick={onPause}>Pause</button> : null}
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
