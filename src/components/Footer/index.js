import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebook,
} from 'react-icons/fa'

import './index.css'

export default function Footer() {
  return (
    <div className="footer-container">
      <img
        alt="website-footer-logo"
        src="https://res.cloudinary.com/dr33vdv2n/image/upload/v1677589935/Vector_3_wgfxrx.png"
        className="footer-testy-kitchen-image-logo"
      />
      <h1 className="footer-tasty-kitchen">Tasty Kitchens</h1>
      <p className="footerdescription">
        The only thing we are serious about is food. Contact us on
      </p>
      <div className="footer-icons-container">
        <FaPinterestSquare
          testid="pintrest-social-icon"
          className="footer-icons"
        />
        <FaInstagram testid="instagram-social-icon" className="footer-icons" />
        <FaTwitter testid="twitter-social-icon" className="footer-icons" />
        <FaFacebook testid="facebook-social-icon" className="footer-icons" />
      </div>
    </div>
  )
}
