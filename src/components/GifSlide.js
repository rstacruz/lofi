import React from 'react'
import Type from 'prop-types'

import * as VARS from '../styles/variables'

/*::
  export type Props = {
    image: string
  }
*/

export const GifSlide = ({ image } /*: Props */) => (
  <div className='GifSlide'>
    {/* Looping image */}
    <span
      className='loop'
      style={{
        backgroundImage: `url('${image}')`
      }}
    />

    {/* Grid overlay */}
    <span className='grid' />

    {/* Gradient overlay */}
    <span className='wash' />

    <style jsx>{`
      .GifSlide {
        position: relative;
        animation: fade-in 2000ms linear;
        width: 100%;
        height: 100%;
        overflow: hidden;
        transform: translate3d(0, 0, 0);
      }

      .grid,
      .loop,
      .wash {
        position: absolute;
        display: block;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }

      .wash {
        z-index: 3;
        background: linear-gradient(to bottom, transparent 50%, #0008);
      }

      .grid {
        z-index: 2;
        background-image: radial-gradient(transparent 30%, ${VARS.gridBg} 35%);
        background-size: ${VARS.gridSize} ${VARS.gridSize};
        background-position: left top;
        background-repeat: repeat;
      }

      .loop {
        z-index: 1;
        background-color: ${VARS.gridBg};
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
      }

      @keyframes fade-in {
        0% {
          opacity: 0;
        }

        50% {
          opacity: 0;
        }

        100% {
          opacity: 1;
        }
      }
    `}</style>
  </div>
)

GifSlide.propTypes = {
  image: Type.string
}

/*
 * Default export
 */

export default GifSlide
