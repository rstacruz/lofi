import React from 'react'
import { HotKeys } from 'react-hotkeys'
import { Subscribe } from 'unstated'

import UIStore from '../stores/UIStore'

/**
 * The keymap.
 */

export const map = {
  'ui.toggleSoundcloud': 'up',
  'media.playPause': 'space'
}

/**
 * Hotkeys connector.
 *
 * As long the focus is within its children, these hotkeys will be active.
 *
 * @example
 *     <PlayerHotkeys>
 *       (stuff go here)
 *     </PlayerHotkeys>
 */

export const PlayerHotkeys = ({ children }) => {
  return (
    <Subscribe to={[UIStore]}>
      {ui => (
        <HotKeys
          keyMap={map}
          handlers={{
            'ui.toggleSoundcloud': () => {
              ui.toggleSoundcloud()
            }
          }}
        >
          {children}
        </HotKeys>
      )}
    </Subscribe>
  )
}

export default PlayerHotkeys
