import React from 'react'
import Type from 'prop-types'

import * as VARS from '../styles/variables'
import GifSlide from '../components/GifSlide'

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
    const images = shuffle(props.images)

    this.state = {
      images,
      interval: props.interval,
      index: props.index
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
    return <GifSlide image={image} />
  }
}

GifSlideshow.propTypes = {
  /** Number of milliseconds to linger on each slide. */
  interval: Type.number,

  /** Array of image URL's. */
  images: Type.arrayOf(Type.string),

  /** The image number to start with. If not given, it will choose a random one. */
  index: Type.number
}

GifSlideshow.defaultProps = {
  interval: 15000,
  images: VARS.images,
  index: 0
}

/**
 * Helper: shuffles an array.
 *
 * @param {Array<*>} array Array to be sorted
 */

function shuffle (array, n) {
  if (n === 0) return array
  return shuffle(
    array.sort(() => Math.random() - 0.5),
    typeof n === 'undefined' ? array.length : n - 1
  )
}

/*
 * Default export
 */

export default GifSlideshow
