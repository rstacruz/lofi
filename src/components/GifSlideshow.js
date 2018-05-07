/* @flow */
import * as React from 'react'

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

export class GifSlideshow extends React.Component<Props, State> {
  // Timeout for timer
  timer: ?global.TimeoutID

  static defaultProps: Props = {
    interval: 15000,
    images: null,
    imageset: 'aesthetic',
    index: 0,
    visible: true
  }

  /**
   * Constructor: sets state
   */

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

  getImage (): string {
    const { images, index } = this.state
    return images[index]
  }

  /**
   * Returns the images to be preloaded.
   */

  getPreload (): Array<string> {
    const { images, index } = this.state
    return [...images, ...images].slice(index + 1, index + 2)
  }

  /**
   * Moves to the next image.
   * Updates state.
   */

  nextImage (): void {
    let { index, images } = this.state
    index += 1
    if (index >= images.length) index = 0
    this.setState({ index })
  }

  /**
   * On mount: start the timer.
   */

  componentDidMount (): void {
    this.tick()
  }

  /**
   * On unmount: stop the timer.
   */

  componentWillUnmount (): void {
    if (this.timer) clearTimeout(this.timer)
    this.timer = undefined
  }

  /**
   * Starts the timer.
   */

  tick (): void {
    const { interval } = this.state

    this.timer = setTimeout(() => {
      this.nextImage()
      this.tick()
    }, interval)
  }

  /**
   * Renders by delegating to `<GifSlide />`.
   */

  render (): React.Node {
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

function shuffle (array: Array<*>, n?: number): Array<*> {
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
