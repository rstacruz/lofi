import React from 'react'
import { Provider } from 'unstated'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'

import StationLinks from '../components/StationLinks'

storiesOf('StationLinks', module).add(
  'Station links',
  withInfo({
    text: `
      Station links
      `
  })(() => (
    <Provider>
      <div
        style={{
          position: 'relative',
          width: '800px',
          margin: '0 auto',
          border: 'solid 2px #333'
        }}
      >
        <StationLinks
          stations={[
            { path: '/lofi-hiphop', title: 'Lo-Fi Hiphop' },
            { path: '/deep-house', title: 'Deep House' }
          ]}
        />
      </div>
    </Provider>
  ))
)
