import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'

import GifSlideshow from '../components/GifSlideshow'

storiesOf('GifSlideshow', module).add(
  'Full example',
  withInfo({
    text: `
        Gif slideshow.
      `
  })(() => (
    <div style={{ width: '400px', height: '300px' }}>
      <GifSlideshow />
    </div>
  ))
)
