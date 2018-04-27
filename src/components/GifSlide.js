import React from 'react'
import Type from 'prop-types'
import color from 'color'

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

      @media (min-width: 481px) {
        /* (Desktop) Add some borders */
        .grid,
        .loop,
        .wash {
          top: 16px;
          left: 16px;
          right: 16px;
          bottom: 16px;
        }
      }

      .grid {
        z-index: 2;
        background: linear-gradient(135deg, transparent 1px, ${VARS.gridBg} 2px)
          left top / ${VARS.gridSize} ${VARS.gridSize};
      }

      .wash {
        z-index: 2;
        background: linear-gradient(
          to bottom,
          transparent 50%,
          ${color('#000').fade(0.3)}
        );
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
