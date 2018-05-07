/* @flow */
import * as React from 'react'

export type Props = {|
  title: string,
  children?: React.Node
|}

/**
 * Headings for a storybook.
 * @param {string} title The text to render
 * @param {ReactNode} [children] Kids to render
 */

const StoryHeading = ({ title, children }: Props) => (
  <div className='StoryHeading'>
    <h2 className='title'>{title}</h2>
    {children || null}

    <style jsx>{`
      .title {
        font-weight: normal;
        color: #888;
        font-size: 0.86em;
        border-bottom: solid 1px #fff1;
        padding-bottom: 8px;
        margin-bottom: 8px;
        margin-top: 32px;
        min-width: 120px;
      }
    `}</style>
  </div>
)

export default StoryHeading
