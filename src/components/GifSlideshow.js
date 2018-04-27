import React from 'react'
import Type from 'prop-types'

import * as VARS from '../styles/variables'
import GifSlide from '../components/GifSlide'

const debug = require('debug')('app:GifSlideshow')

/*::
  export type Props = {
    image: string
  }
*/

/*
 * Slideshow
 */

export class GifSlideshow extends React.Component {
  constructor (props) {
    super(props)
    const images = props.images || VARS.images

    this.state = {
      images,
      interval: props.interval || 15000,
      index: props.index || Math.round(Math.random() * (images.length - 1))
    }
  }

  getImage () {
    const { images, index } = this.state
    return images[index]
  }

  nextImage () {
    let { index, images } = this.state
    index += 1
    if (index >= images.length) index = 0
    debug('nextImage()', index)
    this.setState({ index })
  }

  componentDidMount () {
    this.tick()
  }

  componentWillUnmount () {
    clearTimeout(this.timer)
    this.timer = undefined
  }

  tick () {
    const { interval } = this.state

    this.timer = setTimeout(() => {
      this.nextImage()
      this.tick()
    }, interval)
  }

  render () {
    const image = this.getImage()
    debug('render()', image)
    return <GifSlide image={image} />
  }
}

GifSlideshow.propTypes = {
  interval: Type.number,
  images: Type.arrayOf(Type.string),
  index: Type.number
}

/*
 * Default export
 */

export default GifSlideshow
