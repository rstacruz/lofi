import React from 'react'

let stylesStr

if (process.env.NODE_ENV === 'production') {
  try {
    stylesStr = require(`!raw-loader!../public/styles.css`)
  } catch (e) {
    console.log(e)
  }
}

module.exports = class HTML extends React.Component {
  render () {
    let css

    if (process.env.NODE_ENV === 'production') {
      css = (
        <style
          id='gatsby-inlined-css'
          dangerouslySetInnerHTML={{ __html: stylesStr }}
        />
      )
    }

    const {
      body,
      bodyAttributes,
      headComponents,
      htmlAttributes,
      postBodyComponents,
      preBodyComponents
    } = this.props

    return (
      <html {...htmlAttributes}>
        <head>
          {/* Meta */}
          <meta charSet='utf-8' />
          <meta httpEquiv='x-ua-compatible' content='ie=edge' />
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1, shrink-to-fit=no'
          />

          {/* Android */}
          <meta name='mobile-web-app-capable' content='yes' />
          <meta name='theme-color' content='black' />

          {/* Apple */}
          <meta name='apple-mobile-web-app-title' content='Lofi Beats' />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta
            name='apple-mobile-web-app-status-bar-style'
            content='default'
          />

          {headComponents}
          {css}
        </head>
        <body {...bodyAttributes}>
          {preBodyComponents}
          <div
            className='all'
            key='body'
            id='___gatsby'
            dangerouslySetInnerHTML={{ __html: body }}
          />
          {postBodyComponents}
        </body>
      </html>
    )
  }
}
