import {Component} from 'react'
import './index.css'

class LoginRoute extends Component {
  render() {
    return (
      <div className="Login_Empty">
        <div className="mobile-screen-div">
          <h1 className="mobile-screen-login-heading">Login</h1>
          <img
            alt=""
            src="https://res.cloudinary.com/da4usdzme/image/upload/v1677044955/Rectangle_1457_1_mbxcdd.png"
            className="mobile-screen-image"
          />
        </div>
        <div className="extra-large-container">
          <img
            src="https://res.cloudinary.com/da4usdzme/image/upload/v1677070335/Vector_ufnsxg.png"
            className="vector"
          />
          <h1 className="tasty-kitchens-heading">Tasty Kitchens</h1>
          <h1 className="large-screen-login-headings">Login</h1>
          <form className="form">
            <div className="input-label-container">
              <label htmlFor="username" className="label-name">
                USERNAME
              </label>
              <br />
              <input
                type="text"
                placeholder="Username"
                id="username"
                className="input"
              />
            </div>
            <div className="input-label-container">
              <label htmlFor="username" className="label-name">
                PASSWORD
              </label>
              <br />
              <input
                type="password"
                placeholder="Password"
                id="username"
                className="input"
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
        <img
          className="extra-large-image"
          src="https://res.cloudinary.com/da4usdzme/image/upload/v1676979430/Rectangle_1456_pidghd.png"
          alt=""
        />
      </div>
    )
  }
}
export default LoginRoute
