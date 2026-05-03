import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import ThemeAndVideoContext from '../../context/ThemeAndVideoContext'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeShowPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state

    if (username === '' || password === '') {
      this.setState({
        showSubmitError: true,
        errorMsg: 'Username and Password are required',
      })
      return
    }

    const userDetails = {
      username: 'rahul',
      password: 'rahul@2021',
    }

    const response = await fetch('https://apis.ccbp.in/login', {
      method: 'POST',
      body: JSON.stringify(userDetails),
    })

    const data = await response.json()

    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    const {
      username,
      password,
      showPassword,
      showSubmitError,
      errorMsg,
    } = this.state

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <ThemeAndVideoContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const logoUrl = isDarkTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

          return (
            <div className={`login-route ${isDarkTheme ? 'dark' : 'light'}`}>
              <form className="login-form" onSubmit={this.onSubmitForm}>
                <img src={logoUrl} alt="website logo" className="login-logo" />
                <label className="login-label" htmlFor="username">
                  USERNAME
                </label>
                <input
                  id="username"
                  className="login-input"
                  type="text"
                  value={username}
                  onChange={this.onChangeUsername}
                />
                <label className="login-label" htmlFor="password">
                  PASSWORD
                </label>
                <input
                  id="password"
                  className="login-input"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={this.onChangePassword}
                />
                <div className="show-password-row">
                  <input
                    id="showPassword"
                    type="checkbox"
                    onChange={this.onChangeShowPassword}
                  />
                  <label htmlFor="showPassword" className="show-password-label">
                    Show Password
                  </label>
                </div>
                <button type="submit" className="login-button">
                  Login
                </button>
                {showSubmitError ? (
                  <p className="login-error">*{errorMsg}</p>
                ) : null}
              </form>
            </div>
          )
        }}
      </ThemeAndVideoContext.Consumer>
    )
  }
}

export default Login
