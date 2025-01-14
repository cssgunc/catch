import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import { getDynamicRecentExecInfo } from "../components/execInfo";
import "./About.css";
import FAQ from "./FAQ";

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
        <div style={{ fontWeight: "normal", fontSize: "85%" }}>{position}</div>
      </div>
    </div>
  );
}

function ExecGrid() {
  const [execInfo, setexecInfo] = useState([]);

  useEffect(() => {
    const fetchExecs = async () => {
      const execData = await getDynamicRecentExecInfo();
      setexecInfo(execData);
    };

    fetchExecs();
  }, []);

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
      <Banner imagePath="banner/about_banner_color.jpeg" title="About" />
      <div className="about-content">
        <div className="intro">
          <h2>Carolina Adapts Toys for Children</h2>
          <div className="video-container">
              <iframe
                title="Intro Video"
                class="video"
                width="100%"
                height="0"
                sandbox="allow-scripts allow-popups allow-forms allow-same-origin allow-popups-to-escape-sandbox allow-downloads allow-modals"
                frameborder="0"
                aria-label="YouTube Video, Making toys more accessible for kids"
                src="https://www.youtube.com/embed/LDH36tCupQQ"
                allowfullscreen=""
              ></iframe>
              </div>
          <div id="history">
            <p font="font-family: Arial" style={{fontSize: "20px"}}>
              <em>
                "Founded in November 2018, CATCH works to provide adapted toys
                to children with disabilities who are unable to play with most
                commercially manufactured toys. Utilizing engineering,
                creativity, and innovation, we give back to the community, while
                also raising awareness about underrepresented communities and
                their needs."
              </em>
            </p>
          </div>
        </div>

        <h2>FAQ</h2>
        <FAQ>
          <FAQ.QAItem>
            <FAQ.Question answerId="q1">
              {(isOpen, onToggle) => {
                return (
                  <div>
                    <div
                      className={`faq-question-content ${isOpen ? "open" : ""}`}
                      onClick={onToggle}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span>How do I join CATCH?</span>
                        <svg
                          className={`faq-arrow ${isOpen ? "open" : ""}`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                        >
                          <path
                            d={
                              isOpen
                                ? "M18.59 16.41L20 15l-8-8-8 8 1.41 1.41L12 9.83"
                                : "M5.41 7.59L4 9l8 8 8-8-1.41-1.41L12 14.17"
                            }
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                );
              }}
            </FAQ.Question>
            <FAQ.Answer id="q1">
              Anyone (in any major) can join CATCH at any point in the year.
              Just come to one of our meetings to start adapting! (To become an
              active member, there are certain requirements like GBM
              attendance.)
            </FAQ.Answer>
          </FAQ.QAItem>
          <FAQ.QAItem>
            <FAQ.Question answerId="q2">
              {(isOpen, onToggle) => {
                return (
                  <>
                    <div
                      className={`faq-question-content ${isOpen ? "open" : ""}`}
                      onClick={onToggle}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span>Do I need any experience to join CATCH?</span>
                        <svg
                          className={`faq-arrow ${isOpen ? "open" : ""}`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                        >
                          <path
                            d={
                              isOpen
                                ? "M18.59 16.41L20 15l-8-8-8 8 1.41 1.41L12 9.83"
                                : "M5.41 7.59L4 9l8 8 8-8-1.41-1.41L12 14.17"
                            }
                          />
                        </svg>
                      </div>
                    </div>
                  </>
                );
              }}
            </FAQ.Question>
            <FAQ.Answer id="q2">
              Nope, we welcome all experience levels. We also provide soldering
              training to beginners at every meeting.
            </FAQ.Answer>
          </FAQ.QAItem>
          <FAQ.QAItem>
            <FAQ.Question answerId="q3">
              {(isOpen, onToggle) => {
                return (
                  <>
                    <div
                      className={`faq-question-content ${isOpen ? "open" : ""}`}
                      onClick={onToggle}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span>When are the meetings?</span>
                        <svg
                          className={`faq-arrow ${isOpen ? "open" : ""}`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                        >
                          <path
                            d={
                              isOpen
                                ? "M18.59 16.41L20 15l-8-8-8 8 1.41 1.41L12 9.83"
                                : "M5.41 7.59L4 9l8 8 8-8-1.41-1.41L12 14.17"
                            }
                          />
                        </svg>
                      </div>
                    </div>
                  </>
                );
              }}
            </FAQ.Question>
            <FAQ.Answer id="q3">
              {" "}
              We meet every Tuesday from 6:30 PM to 8:00 PM.
            </FAQ.Answer>
          </FAQ.QAItem>

          <FAQ.QAItem>
            <FAQ.Question answerId="q3">
              {(isOpen, onToggle) => {
                return (
                  <>
                    <div
                      className={`faq-question-content ${isOpen ? "open" : ""}`}
                      onClick={onToggle}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span>Where are the meetings?</span>
                        <svg
                          className={`faq-arrow ${isOpen ? "open" : ""}`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                        >
                          <path
                            d={
                              isOpen
                                ? "M18.59 16.41L20 15l-8-8-8 8 1.41 1.41L12 9.83"
                                : "M5.41 7.59L4 9l8 8 8-8-1.41-1.41L12 14.17"
                            }
                          />
                        </svg>
                      </div>
                    </div>
                  </>
                );
              }}
            </FAQ.Question>
            <FAQ.Answer id="q3">
              {" "}
              We meet in Phillips Hall 19B (the basement of Phillips).
            </FAQ.Answer>
          </FAQ.QAItem>

          <FAQ.QAItem>
            <FAQ.Question answerId="q3">
              {(isOpen, onToggle) => {
                return (
                  <>
                    <div
                      className={`faq-question-content ${isOpen ? "open" : ""}`}
                      onClick={onToggle}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span>How can I donate?</span>
                        <svg
                          className={`faq-arrow ${isOpen ? "open" : ""}`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                        >
                          <path
                            d={
                              isOpen
                                ? "M18.59 16.41L20 15l-8-8-8 8 1.41 1.41L12 9.83"
                                : "M5.41 7.59L4 9l8 8 8-8-1.41-1.41L12 14.17"
                            }
                          />
                        </svg>
                      </div>
                    </div>
                  </>
                );
              }}
            </FAQ.Question>
            <FAQ.Answer id="q3">
              {" "}
              Thanks for considering donating to us! All funds go to toy
              purchases which we will adapt for free and donate to a series of
              our community partners. Check out our{" "}
              <a href="https://www.gofundme.com/f/carolina-adapts-toys-for-children?utm_campaign=p_cf+share-flow-1&utm_medium=copy_link&utm_source=customer">
                GoFundMe
              </a>{" "}
            </FAQ.Answer>
          </FAQ.QAItem>
        </FAQ>

        <div className="execs">
          <h2>Our Team</h2>
          <div className="exec-grid-container">
            <ExecGrid id="exec-team" />
          </div>
        </div>
      </div>
    </div>
  );
}
