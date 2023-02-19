import React from 'react'

export default function About() {
  return (
    <div>
    <link rel = 'stylesheet' href = {require('./About.css')}></link>
    <div>About</div>
    <div>
    <div id = 'title'> Our Executive Board </div>
    <div id = 'table'>

    <div>
      <img src = {require('../images/About/thumbnail_image001[92].png')} alt = 'Darci (President)' id = 'images'  />
      Darci (President)
    </div>
    <div>
      <img src = {require('../images/About/IMG_0557.jpg')} alt = 'Bryce (Vice President)' id = 'images'/>
      Bryce (Vice President)
    </div>
    <div>
      <img src = {require('../images/About/thumbnail_image2.jpg')} alt = 'Rohan (Treasurer)'id = 'images' />
      Rohan (Treasurer)
    </div>
    <div>
      <img src = {require('../images/About/thumbnail_image1.jpg')} alt = 'Chris (Secretary)' id = 'images' />
      Chris (Secretary)
    </div>
    <div>
      <img src = {require('../images/About/thumbnail_IMG_0796.jpg')} alt = 'Jun (Chief Quality Officer)' id = 'images' />
      Jun (Chief Quality Officer)
    </div>
    <div>
      <img src = {require('../images/About/IMG_5285.jpg')} alt = 'Jacob (Chief Technical Officer)' id = 'images'/>
      Jacob (Chief Technical Officer)
    </div>
    <div>
      <img src = {require('../images/About/Katie_sHeadshot.jpg')} alt = 'Jacob (Chief Technical Officer)' id = 'images' />
      Katie (PR Chair)
    </div>
    </div>
    </div>
    </div>
  )
}
