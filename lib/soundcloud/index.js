import loadjs from 'loadjs'

/**
 * Soundcloud script
 */

export const SOUNDCLOUD = 'https://w.soundcloud.com/player/api.js'

/**
 * Loads the Soundcloud script and returns the `SC` object.
 *
 * See: https://developers.soundcloud.com/docs/api/html5-widget
 */

export default function Soundcloud() {
  return new Promise((resolve, reject) => {
    if (window.SC) {
      return resolve(SC)
    }

    loadjs(SOUNDCLOUD, {
      success: () => {
        resolve(window.SC)
      }
    })
  })
}
