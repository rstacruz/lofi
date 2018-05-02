import React from 'react'
import Type from 'prop-types'
import cn from 'classnames'

import * as VARS from '../styles/variables'

/*::
  export type Props = {
    image: string,
    preload: Array<string>,
    visible: boolean
  }
*/

export const GifSlide = ({ image, preload, visible } /*: Props */) => (
  <div className={cn('GifSlide', { '-hidden': !visible, '-visible': visible })}>
    {/* Looping image */}
    <span
      className='loop'
      style={{
        backgroundImage: `url('${image}')`
      }}
    />

    {/* Preloadables */}
    {(preload || []).map(image => (
      <span
        key={image}
        className='preload'
        style={{
          backgroundImage: `url('${image}')`
        }}
      />
    ))}

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
        opacity: 0;
        transition: opacity 2000ms linear;
      }

      .GifSlide.-visible {
        opacity: 1;
        animation: fade-in 2000ms linear;
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
        opacity: 0.5;
      }

      .loop {
        z-index: 1;
        background-color: ${VARS.gridBg};
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
      }

      .preload {
        z-index: 0;
        opacity: 0.01;
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
