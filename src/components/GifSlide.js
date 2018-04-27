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

    <span
      className='loop -overlay -one'
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

      .grid {
        z-index: 2;
        background: linear-gradient(135deg, transparent 1px, ${VARS.gridBg} 2px)
          left top / ${VARS.gridSize} ${VARS.gridSize};
      }

      .loop {
        z-index: 1;
        background-color: ${VARS.gridBg};
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
      }

      .loop.-overlay {
        left: -16px;
        opacity: 0.3;
        filter: brightness(70%) saturate(200%) hue-rotate(284deg);
        mix-blend-mode: screen;
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
