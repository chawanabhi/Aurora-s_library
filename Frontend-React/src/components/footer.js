import React from "react";
import Logo from "../Assets/lms.png";
// import { BsTwitter } from "react-icons/bs";
// import { SiLinkedin } from "react-icons/si";
// import { FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="footer-section-one">
        <div className="footer-logo-container">
          <img src={Logo} alt="" />
        </div>
        {/* <div className="footer-icons">
          <BsTwitter />
          <SiLinkedin />
          <FaFacebookF />
        </div> */}
      </div>
      <div className="footer-section-two">
        <div className="footer-section-columns">
          <span>Qualtiy</span>
          <span>Help</span>
          <span>Share</span>
          <span>Carrers</span>
          <span>Books</span>
        </div>
       <div className="footer-section-columns">
   <h4>Contact Us</h4>
  <span>📞 +91-40-12345678</span>
<span>📱 +91-9876543210</span>
<span>📧 info@lms.com</span>
<span>📩 contact@lms.com</span>
<span>📝 support@lms.com</span>
</div>

        <div className="footer-section-columns">
          <span>     Terms & Conditions</span>
          <span>     Privacy Policy</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;