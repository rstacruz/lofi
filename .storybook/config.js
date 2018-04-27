import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import { setDefaults } from '@storybook/addon-info'
import Container from './Container'

addDecorator(story => <Container story={story} />)

setDefaults({
  // header: false,
  // inline: true
})

/*
 * Load stories
 */

function loadStories() {
  require('../src/stories/index.js')
}

configure(loadStories, module)
