import React from 'react'
import Link from 'gatsby-link'

export const StationLink = ({ path, title }) => (
  <Link to={path} className='link'>
    <span className='StationLink'>
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
    </span>
  </Link>
)

export default StationLink
