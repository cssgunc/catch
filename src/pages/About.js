import React from 'react';
import FAQ from "./FAQ";


export default function About(){

  return(
    <div className="App">
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
