import React, { useEffect, useRef } from 'react';
import { FaInstagram } from 'react-icons/fa'
import { FaFacebook } from 'react-icons/fa'
import { FaLinkedin } from 'react-icons/fa'
import { FaHome } from 'react-icons/fa'
import { FaEnvelope } from 'react-icons/fa'
import './Footer.css'

export default function Footer() {
  
  return (
    <div class="footer">
      <div class="footer-main">
        <div class="footer-col">
          <div style={{display: 'inline-block', textAlign: 'left'}}>
            <div class="footer-heading">LEARN</div>
            <div>
            <a href="/about" class="footer-row">History</a>
            </div>
            <div>
            <a href="/about" class="footer-row">FAQ</a>
            </div>
            <div>
            <a href="/about" class="footer-row">The Team</a>
            </div>
          </div>
        </div>
        <div class="footer-col">
          <div style={{display: 'inline-block', textAlign: 'left'}}>
            <div class="footer-heading">GET INVOLVED</div>
            <div>
            <a href="/toys" class="footer-row">Tutorials</a>
            </div>
            <div>
            <a href="/toys" class="footer-row">Partner Application</a>
            </div>
          </div>
        </div>
        <div class="footer-col">
          <div style={{display: 'inline-block', textAlign: 'left'}}>
            <div class="footer-heading">SUPPORT</div>
            <div>
            <a href="/donations" class="footer-row" li>GoFundMe</a>
            </div>
            <div>
            <a href="/donations" class="footer-row">Donate a Toy</a>
            </div>
          </div>
        </div>
        <div class="footer-col">
          <div style={{display: 'inline-block', textAlign: 'left'}}>
            <div class="footer-heading">CONNECT</div>
            <div class="footer-row">
              <div><FaHome className='inline-icon'/>120 E Cameron Ave</div>
              <div>Chapel Hill, NC 27514</div> 
              <div>Room 19B</div>
            </div>
            <div class="footer-row"><FaEnvelope className='inline-icon'/>catchUNC@gmail.com</div>
          </div>
        </div>
      </div>
        <div class="links">
          <a href="https://www.instagram.com/catch_unc/" target="_blank">
            <FaInstagram size={20} className='icon'/>
          </a>
          <a href="https://www.facebook.com/CATCHUNC/" target="_blank">
            <FaFacebook size={20} className='icon'/>
          </a>
          <a href="https://www.linkedin.com/in/carolina-adapts-toys-for-children-0b351a220/" target="_blank">
            <FaLinkedin size={20} className='icon'/>
          </a>
    </div>
  </div>
  )
}
