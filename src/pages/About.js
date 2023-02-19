import React from 'react';
import FAQ from "./FAQ";


export default function About(){

  return(
    <div className="App">
      <h1>About Us</h1>
      <h3>Carolina Adapts Toys for Children</h3>

      <iframe class = "video" width = "750" height = "450" sandbox="allow-scripts allow-popups allow-forms allow-same-origin allow-popups-to-escape-sandbox allow-downloads allow-modals" frameborder="0" aria-label="YouTube Video, Making toys more accessible for kids" src="https://www.youtube.com/embed/LDH36tCupQQ" allowfullscreen=""></iframe>
      
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
    </div>
  );
}
