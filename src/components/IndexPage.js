import React from 'react'
import Link from 'gatsby-link'

export const IndexPage = ({ pages }) => (
  <div>
    {pages.map(page => (
      <div>
        <Link to={page.path} key={page.path}>
          {page.title}
        </Link>
      </div>
    ))}
  </div>
)

export default IndexPage
