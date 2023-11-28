import React from 'react';
import FAQ from "./FAQ";
import './About.css';
//import bannerImage from '../images/About/banner.jpg';
import bannerImage from '../images/About/about_banner_color.jpeg';
import Banner from '../components/Banner';
import  { execInfo } from "../components/execInfo";
import './About.css';

function ExecTile({ imagePath, name, position }) {
  return (
    <div className="exec-tile">
      <img
        src={imagePath}
        alt={`${name} (${position})`}
        className="exec-image"
      />
      <div className="exec-names">
        <div>{name}</div>
        <div>{position}</div>
      </div>
    </div>
  );
}

function ExecGrid() {
  return (
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

export default function About() {

  return (
    <div className="App">
      <Banner
        imagePath={bannerImage}
        title='About'
      />
      <div className="about-content">
        <div className="intro">
          <h2>Carolina Adapts Toys for Children</h2>
          <a id="about-video" href="#">
            <div className="video-container">
              <iframe title="Intro Video" class="video" width="750" height="450" sandbox="allow-scripts allow-popups allow-forms allow-same-origin allow-popups-to-escape-sandbox allow-downloads allow-modals" frameborder="0" aria-label="YouTube Video, Making toys more accessible for kids" src="https://www.youtube.com/embed/LDH36tCupQQ" allowfullscreen=""></iframe>
            </div>
          </a>
          <div id="text">
            <p font="font-family: Arial"><em>
              "Founded in November 2018, CATCH works to provide adapted toys to children with special needs who are unable to play with most commercially manufactured toys. Utilizing engineering, creativity, and innovation, we give back to the community, while also raising awareness about underrepresented communities and their needs."
            </em></p>
          </div>
        </div>

        <h2>FAQ</h2>
        <FAQ>
          <FAQ.QAItem>
            <FAQ.Question answerId="q1">
              {(isOpen, onToggle) => {
                return (
                  <div>
                    <div className={`faq-question-content ${isOpen ? "open" : ""}`} onClick={onToggle}>
                      <hr></hr>
                      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                      <span>How do I join CATCH?</span>
                      <svg className={`faq-arrow ${isOpen ? "open" : ""}`} width="20" height="20" viewBox="0 0 20 20">
                      <path d={isOpen ? "M18.59 16.41L20 15l-8-8-8 8 1.41 1.41L12 9.83" : "M5.41 7.59L4 9l8 8 8-8-1.41-1.41L12 14.17"} />
                      </svg>
                      </div>
                      <hr></hr>
                    </div>
                  </div>
                );
              }}
            </FAQ.Question>
            <FAQ.Answer id="q1">Anyone (in any major) can join CATCH at any point in the year. Just come to one of our meetings to start adapting! (To become an active member, there are certain requirements like GBM attendance.)</FAQ.Answer>
          </FAQ.QAItem>
          <FAQ.QAItem>
            <FAQ.Question answerId="q2">
              {(isOpen, onToggle) => {
                return (
                  <>
                  <div className={`faq-question-content ${isOpen ? "open" : ""}`} onClick={onToggle}>
                    <hr></hr>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <span>Do I need any experience to join CATCH?</span>
                    <svg className={`faq-arrow ${isOpen ? "open" : ""}`} width="20" height="20" viewBox="0 0 20 20">
                    <path d={isOpen ? "M18.59 16.41L20 15l-8-8-8 8 1.41 1.41L12 9.83" : "M5.41 7.59L4 9l8 8 8-8-1.41-1.41L12 14.17"} />
                    </svg>
                    </div>
                    <hr></hr>
                  </div>
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
                  <div className={`faq-question-content ${isOpen ? "open" : ""}`} onClick={onToggle}>
                    <hr></hr>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <span>When are the meetings?</span>
                    <svg className={`faq-arrow ${isOpen ? "open" : ""}`} width="20" height="20" viewBox="0 0 20 20">
                    <path d={isOpen ? "M18.59 16.41L20 15l-8-8-8 8 1.41 1.41L12 9.83" : "M5.41 7.59L4 9l8 8 8-8-1.41-1.41L12 14.17"} />
                    </svg>
                    </div>
                    <hr></hr>
                  </div>
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
                  <div className={`faq-question-content ${isOpen ? "open" : ""}`} onClick={onToggle}>
                    <hr></hr>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <span>Where are the meetings?</span>
                    <svg className={`faq-arrow ${isOpen ? "open" : ""}`} width="20" height="20" viewBox="0 0 20 20">
                    <path d={isOpen ? "M18.59 16.41L20 15l-8-8-8 8 1.41 1.41L12 9.83" : "M5.41 7.59L4 9l8 8 8-8-1.41-1.41L12 14.17"} />
                    </svg>
                    </div>
                    <hr></hr>
                  </div>
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
                  <div className={`faq-question-content ${isOpen ? "open" : ""}`} onClick={onToggle}>
                    <hr></hr>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <span>How can I donate?</span>
                    <svg className={`faq-arrow ${isOpen ? "open" : ""}`} width="20" height="20" viewBox="0 0 20 20">
                    <path d={isOpen ? "M18.59 16.41L20 15l-8-8-8 8 1.41 1.41L12 9.83" : "M5.41 7.59L4 9l8 8 8-8-1.41-1.41L12 14.17"} />
                    </svg>
                    </div>
                    <hr></hr>
                  </div>
                </>
                );
              }}
            </FAQ.Question>
            <FAQ.Answer id="q3"> Thanks for considering donating to us! All funds go to toy purchases which we will adapt for free and donate to a series of our community partners. Check out our <a href="https://www.gofundme.com/f/carolina-adapts-toys-for-children?utm_campaign=p_cf+share-flow-1&utm_medium=copy_link&utm_source=customer">GoFundMe</a> </FAQ.Answer>
          </FAQ.QAItem>
        </FAQ>

        <div className="execs">
          <h2 id="title">Our Team</h2>
          <div className="exec-grid-container">
            <ExecGrid id="exec-team" />
          </div>
        </div>
      </div>
    </div>

  );
}