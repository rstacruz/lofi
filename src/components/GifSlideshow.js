import React from 'react'
import * as VARS from '../styles/variables'
// import PropTypes from 'prop-types'

export const GifSlideshow = () => (
  <div className='GifSlideshow'>
    {/* Looping image */}
    <span
      className='loop'
      style={{
        backgroundImage: `url('${VARS.gridImage}')`
      }}
    />

    {/* Grid overlay */}
    <span className='grid' />

    <style jsx>{`
      .GifSlideshow {
        position: relative;
        animation: fade-in 2000ms linear;
        width: 100%;
        height: 100%;
      }

      .grid,
      .loop {
        position: absolute;
        display: block;
        top: 6px;
        left: 6px;
        right: 6px;
        bottom: 6px;
      }

      .grid {
        z-index: 2;
        background: linear-gradient(135deg, transparent 1px, ${VARS.gridBg} 1px)
          left top / ${VARS.gridSize} ${VARS.gridSize};
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

// GifSlideshow.propTypes = {
//   image: PropTypes.string
// }

export default GifSlideshow
