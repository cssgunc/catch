import React from 'react'
import './Banner.css'

export default function Banner(props) {
  //Test
  return (
    <div className='banner'>
        <img
            src={props.imagePath}
            className="banner-picture"
            alt="CATCH Team"
        />
        <div className='banner-text-position'>
            <h1 className='banner-text'>{props.title}</h1>
        </div>
    </div>
  )
}
