/* @flow */
import React from 'react'
import Link from 'gatsby-link'

/**
 * Prop types
 */

export type Props = {
  path: string,
  title: string
}

/**
 * A link to a station
 */

export const StationLink = ({ path, title }: Props) => (
  <Link to={path} className='link'>
    <span className='StationLink'>
      <span className='title'>{title}</span>

      <style jsx>{`
        .StationLink,
        .StationLink:visited {
          color: #fff;
          text-shadow: 0 1px 1px #0008;
          text-decoration: none;
          font-weight: bold;
          display: block;
          padding: 16px 8px;
          text-align: center;
          border-radius: 3px;
        }

        .StationLink:hover,
        .StationLink:focus {
          outline: 0;
        }
      `}</style>
    </span>
  </Link>
)

/*
 * Export
 */

export default StationLink
