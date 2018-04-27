import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import { setOptions } from '@storybook/addon-options'
import Container from './Container'

/*
 * Wrap all examples
 */

addDecorator(story => <Container story={story} />)

/*
 * Options
 * See: https://github.com/storybooks/storybook/tree/master/addons/options
 */

setOptions({
  name: 'Lofi Storybook',
  showAddonPanel: false,
  hierarchySeparator: /\//
})

/*
 * Load stories
 */

function loadStories() {
  require('../src/stories/index.js')
}

configure(loadStories, module)
