import React from 'react';
import FAQ from "./FAQ";
import bannerImage from '../images/About/banner.jpg';
import Banner from '../components/Banner';
import presPic from '../images/About/thumbnail_image001[92].png';
import vicepresPic from '../images/About/IMG_0557.jpg';
import treasurerPic from '../images/About/thumbnail_image2.jpg';
import secretaryPic from '../images/About/thumbnail_image1.jpg';
import cqoPic from '../images/About/thumbnail_IMG_0796.jpg';
import ctoPic from '../images/About/IMG_5285.jpg';
import prchairPic from '../images/About/Katie_s Headshot.jpg';

import './About.css';

function ExecTile({imagePath, name, position}) {
  return(
    <div class>
      <img src = {imagePath} alt = {name + '(' + position + ')'} id = 'images'  />
      {name} ({position})
    </div>
  );
}

function ExecGrid() {
  const execInfo = [
    {image: presPic, name: 'Darci', position: 'President'},
    {image: vicepresPic, name: 'Bryce', position: 'Vice President'},
    {image: treasurerPic, name: 'Rohan', position: 'Treasurer'},
    {image: secretaryPic, name: 'Chris', position: 'Secretary'},
    {image: cqoPic, name: 'Jun', position: 'Chief Quality Officer'},
    {image: ctoPic, name: 'Jacob', position: 'Chief Technical Officer'},
    {image: prchairPic, name: 'Katie', position: 'PR Chair'}
  ]
  
  return(
    <>
        {execInfo.map((execMember) => (
          <ExecTile
            imagePath={execMember.image}
            name={execMember.name}
            position={execMember.position}
          />
        ))}
    </>
  );
}

export default function About(){

  return(
    <div className="App">
      <Banner 
        imagePath={bannerImage}
        title='About'
      />
      
      <h3>Carolina Adapts Toys for Children</h3>
      <a id="about-video">
      <iframe title="Intro Video" class = "video" width = "750" height = "450" sandbox="allow-scripts allow-popups allow-forms allow-same-origin allow-popups-to-escape-sandbox allow-downloads allow-modals" frameborder="0" aria-label="YouTube Video, Making toys more accessible for kids" src="https://www.youtube.com/embed/LDH36tCupQQ" allowfullscreen=""></iframe>
      </a>
      <div id = "text">
        <p font= "font-family: Arial"><em>
          "Founded in November 2018, CATCH works to provide adapted toys to children with special needs who are unable to play with most commercially manufactured toys. Utilizing engineering, creativity, and innovation, we give back to the community, while also raising awareness about underrepresented communities and their needs."
        </em></p>
      </div>
      <h1>FAQ</h1>
      <FAQ>
        <FAQ.QAItem>
          <FAQ.Question answerId="q1">
            {(isOpen, onToggle) => {
              return (
                <><hr></hr>
                  <span>How do I join CATCH?</span>
                  <hr></hr>
                </>
              );
            }}
          </FAQ.Question>
          <FAQ.Answer  id="q1">Anyone (in any major) can join CATCH at any point in the year. Just come to one of our meetings to start adapting! (To become an active member, there are certain requirements like GBM attendance.)</FAQ.Answer>
        </FAQ.QAItem>
        <FAQ.QAItem>
          <FAQ.Question answerId="q2">
            {(isOpen, onToggle) => {
              return (
                <>
                  {isOpen ? "" : ""}
                  <span>Do I need any experience to join CATCH?</span>
                  <hr></hr>
                </>
              );
            }}
          </FAQ.Question>
          <FAQ.Answer id="q2">Nope, we welcome all experience levels. We also provide soldering training to beginners at every meeting.</FAQ.Answer>
        </FAQ.QAItem>
        <FAQ.QAItem>
          <FAQ.Question answerId="q3">
            {(isOpen, onToggle) => {
              return (
                <>
                  {isOpen ? "" : ""}
                  <span>When are the meetings?</span>
                  <hr></hr>
                </>
              );
            }}
          </FAQ.Question>
          <FAQ.Answer id="q3"> We meet every Tuesday from 6:30 PM to 8:00 PM.</FAQ.Answer>
        </FAQ.QAItem>
        
        <FAQ.QAItem>
          <FAQ.Question answerId="q3">
            {(isOpen, onToggle) => {
              return (
                <>
                  {isOpen ? "" : ""}
                  <span>Where are the meetings?</span>
                  <hr></hr>
                </>
              );
            }}
          </FAQ.Question>
          <FAQ.Answer id="q3"> We meet in Phillips Hall 19B (the basement of Phillips).</FAQ.Answer>
        </FAQ.QAItem>

        <FAQ.QAItem>
          <FAQ.Question answerId="q3">
            {(isOpen, onToggle) => {
              return (
                <>
                  {isOpen ? "" : ""}
                  <span>How can I donate?</span>
                  <hr></hr>
                </>
              );
            }}
          </FAQ.Question>
          <FAQ.Answer id="q3"> Thanks for considering donating to us! All funds go to toy purchases which we will adapt for free and donate to a series of our community partners. Check out our <a href="https://www.gofundme.com/f/carolina-adapts-toys-for-children?utm_campaign=p_cf+share-flow-1&utm_medium=copy_link&utm_source=customer">GoFundMe</a> </FAQ.Answer>
        </FAQ.QAItem>
      </FAQ>

      <div>
        <div id = 'title'> Our Executive Board </div>
        <div id = 'table'>
          <ExecGrid id="exec-team"/>
        </div>
      </div>
    </div>
  );
}
