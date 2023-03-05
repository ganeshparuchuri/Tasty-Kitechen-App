import './index.css'
import {Link} from 'react-router-dom'

const Notfound = () => (
  <div className="not-found-container">
    <img
      className="not-found-image"
      src="https://res.cloudinary.com/dr33vdv2n/image/upload/v1677584413/Layer_1_p0jc0q.png"
      alt="not found"
    />
    <h1 className="Page-not-found">Page Not Found</h1>
    <p className="page-not-found-description">
      We are sorry, the page you requested could not be found. Please go back to
      the homepage
    </p>
    <Link to="/">
      <button type="button" className="home-page-btn">
        Home Page
      </button>
    </Link>
  </div>
)
export default Notfound
