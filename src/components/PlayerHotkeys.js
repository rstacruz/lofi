/* @flow */
import * as React from 'react'
import { HotKeys } from 'react-hotkeys'
import { Subscribe } from 'unstated'

import UIStore from '../stores/UIStore'
import type { KeyMap } from '../types'

/*
 * Types
 */

export type Props = {|
  children: React.Node
|}

/**
 * The keymap.
 */

export const map: KeyMap = {
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

export const PlayerHotkeys = ({ children }: Props) => {
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
