import React from 'react'
import * as VARS from '../styles/variables'

export default () => (
  <div className="GifSlideshow">
    <style jsx>{`
      .GifSlideshow {
        width: 100%;
        height: 100%;
        background: ${VARS.gridBg};
        border: solid 6px ${VARS.gridBg};
        background:
          linear-gradient(135deg, transparent 1px, ${
            VARS.gridBg
          } 2px) left top / ${VARS.gridSize} ${VARS.gridSize},
          url('${VARS.gridImage}') center center / cover no-repeat, ${
      VARS.gridBg
    };
      }
    `}</style>
  </div>
)
