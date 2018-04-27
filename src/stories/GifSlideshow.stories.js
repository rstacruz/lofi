import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'

import GifSlideshow from '../components/GifSlideshow'
import StoryHeading from '../components/StoryHeading'

storiesOf('GifSlideshow', module).add(
  'Slideshow',
  withInfo({
    text: `
        Gif slideshow.
      `
  })(() => (
    <div style={{ width: '800px', height: '450px' }}>
      <StoryHeading title='Slideshow (interval 5000ms)' />
      <GifSlideshow interval={5000} />
    </div>
  ))
)
