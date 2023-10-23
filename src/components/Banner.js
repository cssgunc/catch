import React from 'react'
import './Banner.css'

export default function Banner(props) {
  return (
    <div className='banner'>
      <div
        //style={{ backgroundColor: props.color }}
        style={{ backgroundColor: 'blue' }}
        className="banner-picture"
        alt="CATCH Team"
      />
      <div className='banner-text-position'>
        <h1 className='banner-text'>{props.title}</h1>
      </div>
    </div>
  )
}

//fix exact colors, get rid of red imports, find exact colors and width
//backtround-color={props.bannerColor}