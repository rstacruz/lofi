import React from 'react'
import { navigateTo } from 'gatsby-link'

export const StationLink = ({ path, title }) => (
  <a
    href={path}
    className='StationLink'
    onClick={evt => {
      evt.preventDefault()
      navigateTo(path)
    }}
  >
    <span className='title'>{title}</span>

    <style jsx>{`
      .StationLink,
      .StationLink:visited {
        color: #888;
        text-decoration: none;
        font-weight: bold;
        display: block;
        padding: 8px;
      }

      .StationLink:hover,
      .StationLink:focus {
        color: #fff;
      }
    `}</style>
  </a>
)

export default StationLink
