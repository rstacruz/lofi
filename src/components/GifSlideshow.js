/* @flow */
import React, { Component } from 'react'

import * as IMAGES from '../data/images'
import GifSlide from '../components/GifSlide'

/*
 * Types
 */

export type Props = {|
  interval: number,
  images: ?Array<string>,
  index: number,
  imageset: ?string,
  visible: boolean
|}

export type State = {|
  interval: number,
  images: Array<string>,
  index: number
|}

/*
 * Slideshow
 */

export class GifSlideshow extends Component<Props, State> {
  // Timeout for timer
  timer: ?global.TimeoutID

  static defaultProps: Props = {
    interval: 15000,
    images: null,
    imageset: 'aesthetic',
    index: 0,
    visible: true
  }

  constructor (props: Props) {
    super(props)

    // Get images and shuffle them
    const rawImages =
      (props.images ? props.images : IMAGES[props.imageset]) || []
    const images = shuffle(rawImages)

    // TODO: Implement this as getDerivedStateFromProps
    this.state = {
      images,
      interval: props.interval,
      index: props.index
    }
  }

  /**
   * Returns the current image.
   */

  getImage () {
    const { images, index } = this.state
    return images[index]
  }

  /**
   * Returns the images to be preloaded.
   */

  getPreload () {
    const { images, index } = this.state
    return [...images, ...images].slice(index + 1, index + 2)
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
    if (this.timer) clearTimeout(this.timer)
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
    const preload = this.getPreload()
    const { visible } = this.props

    return <GifSlide {...{ image, preload, visible }} />
  }
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
