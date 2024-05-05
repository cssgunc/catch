import React from "react";
import { FaEnvelope, FaHome, FaInstagram } from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
  return (
    <div class="footer">
      <div class="footer-main">
        <div class="footer-col" id="firstCol">
          <div style={{ display: "inline-block", textAlign: "left" }}>
            <div class="footer-heading">LEARN</div>
            <div>
              <a href="/about" class="footer-row">
                History
              </a>
            </div>
            <div>
              <a href="/about" class="footer-row">
                FAQ
              </a>
            </div>
            <div>
              <a href="/about" class="footer-row">
                The Team
              </a>
            </div>
          </div>
        </div>
        <div class="footer-col">
          <div style={{ display: "inline-block", textAlign: "left" }}>
            <div class="footer-heading">GET INVOLVED</div>
            <div>
              <a href="/toys" class="footer-row">
                Tutorials
              </a>
            </div>
            <div>
              <a href="/toys" class="footer-row">
                Partner Application
              </a>
            </div>
          </div>
        </div>
        <div class="footer-col">
          <div style={{ display: "inline-block", textAlign: "left" }}>
            <div class="footer-heading">SUPPORT</div>
            <div>
              <a href="/donations" class="footer-row" li>
                GoFundMe
              </a>
            </div>
            <div>
              <a href="/donations" class="footer-row">
                Donate a Toy
              </a>
            </div>
          </div>
        </div>
        <div class="footer-col">
          <div style={{ display: "inline-block", textAlign: "left" }}>
            <div class="footer-heading">CONNECT</div>
            <div
              class="footer-row"
              style={{ lineHeight: "normal", marginBottom: "6px" }}
            >
              <div>
                <FaHome className="inline-icon" />
                120 E Cameron Ave
              </div>
              <div>Chapel Hill, NC 27514</div>
              <div>Room 19B</div>
            </div>
            <div class="footer-row">
              <FaEnvelope className="inline-icon" />
              <a
                href="mailto:catchUNC@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                catchUNC@gmail.com
              </a>
            </div>
            <div class="footer-row">
              <FaInstagram className="inline-icon" />
              <a
                href="https://www.instagram.com/catch_unc/"
                target="_blank"
                rel="noreferrer"
              >
                catch_unc
              </a>
            </div>
          </div>
        </div>
        <div class="footer-col">
        <div style={{ display: "inline-block", textAlign: "left" }}>
        <div class="footer-heading">EXTRA</div>
            <div>
              <a href="https://forms.gle/8KDnV7uPFhHeXhJq9" class="footer-row" li>
                Report a Bug 🐞
              </a>
            </div>
            <div>
              <a href="https://cssgunc.org/" class="footer-row">
                Website Made by CS + SG at UNC!
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
