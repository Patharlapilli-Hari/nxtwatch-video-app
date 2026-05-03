import {Link, withRouter} from 'react-router-dom'
import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'
import {FaMoon} from 'react-icons/fa'
import {FiSun} from 'react-icons/fi'

import ThemeAndVideoContext from '../../context/ThemeAndVideoContext'

import './index.css'

const Header = props => {
  const {history} = props

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <ThemeAndVideoContext.Consumer>
      {value => {
        const {isDarkTheme, toggleTheme} = value
        const logoUrl = isDarkTheme
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

        return (
          <nav className={`header ${isDarkTheme ? 'dark' : 'light'}`}>
            <Link to="/">
              <img src={logoUrl} alt="website logo" className="header-logo" />
            </Link>
            <div className="header-actions">
              <button
                type="button"
                className="theme-button"
                data-testid="theme"
                onClick={toggleTheme}
              >
                {isDarkTheme ? <FiSun /> : <FaMoon />}
              </button>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                alt="profile"
                className="profile-image"
              />
              <Popup
                modal
                trigger={
                  <button type="button" className="logout-button">
                    Logout
                  </button>
                }
              >
                {close => (
                  <div className="popup-content">
                    <p className="popup-text">
                      Are you sure, you want to logout
                    </p>
                    <div className="popup-buttons">
                      <button
                        type="button"
                        className="cancel-button"
                        onClick={close}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="confirm-button"
                        onClick={onClickLogout}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                )}
              </Popup>
            </div>
          </nav>
        )
      }}
    </ThemeAndVideoContext.Consumer>
  )
}

export default withRouter(Header)
