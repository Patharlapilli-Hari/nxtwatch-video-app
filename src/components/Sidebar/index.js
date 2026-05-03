import {Link, withRouter} from 'react-router-dom'
import {AiFillHome, AiOutlineFire} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
import {BiListPlus} from 'react-icons/bi'

import ThemeAndVideoContext from '../../context/ThemeAndVideoContext'

import './index.css'

const Sidebar = props => {
  const {location} = props

  const navItems = [
    {path: '/', label: 'Home', icon: <AiFillHome />},
    {path: '/trending', label: 'Trending', icon: <AiOutlineFire />},
    {path: '/gaming', label: 'Gaming', icon: <SiYoutubegaming />},
    {path: '/saved-videos', label: 'Saved Videos', icon: <BiListPlus />},
  ]

  return (
    <ThemeAndVideoContext.Consumer>
      {value => {
        const {isDarkTheme} = value

        return (
          <aside className={`sidebar ${isDarkTheme ? 'dark' : 'light'}`}>
            <ul className="nav-list">
              {navItems.map(eachItem => (
                <li key={eachItem.path} className="nav-item">
                  <Link
                    to={eachItem.path}
                    className={`nav-link ${
                      location.pathname === eachItem.path ? 'active' : ''
                    }`}
                  >
                    <span className="nav-icon">{eachItem.icon}</span>
                    <span>{eachItem.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="contact-section">
              <p className="contact-heading">CONTACT US</p>
              <div className="social-icons">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                  alt="facebook logo"
                />
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                  alt="twitter logo"
                />
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                  alt="linked in logo"
                />
              </div>
              <p className="contact-text">
                Enjoy! Now to see your channels and recommendations!
              </p>
            </div>
          </aside>
        )
      }}
    </ThemeAndVideoContext.Consumer>
  )
}

export default withRouter(Sidebar)
