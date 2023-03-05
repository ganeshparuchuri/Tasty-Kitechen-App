import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'

import Cookies from 'js-cookie'
import './index.css'
import {GiHamburgerMenu, GiCancel} from 'react-icons/gi'

class Navbar extends Component {
  state = {isPopupShow: false}

  onclickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  hamBurgerClick = () => {
    this.setState(prevState => ({isPopupShow: !prevState.isPopupShow}))
  }

  hamBurgerShow = () => (
    <div className="navbar-container-popup">
      <ul className="pop-up-ullist">
        <Link to="/" className="link-class">
          <li className="list-home-popup">Home</li>
        </Link>
        <Link to="/cart" className="link-class">
          <li className="cart-heading-popup">Cart</li>
        </Link>
      </ul>
      <button
        className="logout-popup"
        type="button"
        onClick={() => this.onclickLogout()}
      >
        Logout
      </button>
      <button
        type="button"
        className="cancel-button"
        onClick={() => this.hamBurgerClick()}
      >
        <GiCancel />
      </button>
    </div>
  )

  render() {
    const {isPopupShow} = this.state

    return (
      <>
        <nav className="navbar-container">
          <div className="navbarlogo-heading-container">
            <Link to="/">
              <img
                className="navbar-logo"
                src="https://res.cloudinary.com/da4usdzme/image/upload/v1677070335/Vector_ufnsxg.png"
                alt="website logo"
              />
            </Link>
            <h1 className="Tasty-kitchen-heading">Tasty Kitchens</h1>
          </div>
          <button
            type="button"
            className="hamburger-button"
            onClick={this.hamBurgerClick}
          >
            <GiHamburgerMenu className="hamburger-icon" />
          </button>

          <ul className="home-cart-container">
            <Link to="/" className="link-class">
              <li className="list-home">Home</li>
            </Link>
            <Link to="/cart" className="link-class">
              <li className="cart-heading">Cart</li>
            </Link>

            <button
              className="logout"
              type="button"
              onClick={this.onclickLogout}
            >
              Logout
            </button>
          </ul>
        </nav>
        {isPopupShow ? this.hamBurgerShow() : null}
      </>
    )
  }
}

export default withRouter(Navbar)
