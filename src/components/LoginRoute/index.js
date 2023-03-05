import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginRoute extends Component {
  state = {username: '', password: '', isShowError: false, errormsg: ''}

  onchangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onchangePassword = event => {
    this.setState({password: event.target.value})
  }

  submitSuccessfull = JwtToken => {
    const {history} = this.props
    console.log(JwtToken)
    Cookies.set('jwt_token', JwtToken, {expires: 30})
    history.replace('/')
  }

  submitFailure = errormsg => {
    this.setState({isShowError: true, errormsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.submitSuccessfull(data.jwt_token)
    } else {
      this.submitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, isShowError, errormsg} = this.state
    const jwt = Cookies.get('jwt_token')
    if (jwt !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="Login_Empty">
        <div className="mobile-screen-div">
          <h1 className="mobile-screen-login-heading">Login</h1>
          <img
            alt="website login"
            src="https://res.cloudinary.com/da4usdzme/image/upload/v1677044955/Rectangle_1457_1_mbxcdd.png"
            className="mobile-screen-image"
          />
        </div>
        <div className="extra-large-container">
          <img
            src="https://res.cloudinary.com/da4usdzme/image/upload/v1677070335/Vector_ufnsxg.png"
            className="vector"
            alt="website logo"
          />
          <h1 className="tasty-kitchens-heading">Tasty Kitchens</h1>
          <h1 className="large-screen-login-headings">Login</h1>
          <form className="form" onSubmit={this.submitForm}>
            <div className="input-label-container">
              <label htmlFor="username" className="label-name">
                USERNAME
              </label>
              <br />
              <input
                value={username}
                onChange={this.onchangeUserName}
                type="text"
                placeholder="Username"
                id="username"
                className="input"
              />
            </div>
            <div className="input-label-container">
              <label htmlFor="password" className="label-name">
                PASSWORD
              </label>
              <br />
              <input
                value={password}
                onChange={this.onchangePassword}
                type="password"
                placeholder="Password"
                id="password"
                className="input"
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
            {isShowError && <p className="errormsg">{errormsg}</p>}
          </form>
        </div>
        <img
          className="extra-large-image"
          src="https://res.cloudinary.com/da4usdzme/image/upload/v1676979430/Rectangle_1456_pidghd.png"
          alt="website login"
        />
      </div>
    )
  }
}
export default LoginRoute
