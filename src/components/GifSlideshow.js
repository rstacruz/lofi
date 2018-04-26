import React from 'react'
import * as VARS from '../styles/variables'

export default () => (
  <div className='GifSlideshow'>
    <span className='grid' />
    <span className='loop' />
    <style jsx>{`
      .GifSlideshow {
        position: relative
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
        background:
          linear-gradient(
            135deg,
            transparent 2px,
            ${VARS.gridBg} 2px
          ) left top / ${VARS.gridSize} ${VARS.gridSize};
      }

      .loop {
        z-index: 1;
        background:
          ${VARS.gridBg}
          url('${VARS.gridImage}') center center / cover no-repeat;
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
