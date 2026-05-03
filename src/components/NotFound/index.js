import Header from '../Header'
import Sidebar from '../Sidebar'
import ThemeAndVideoContext from '../../context/ThemeAndVideoContext'

import './index.css'

const NotFound = () => (
  <ThemeAndVideoContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const imageUrl = isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'

      return (
        <>
          <Header />
          <div className="app-layout">
            <Sidebar />
            <div
              className={`route-container ${isDarkTheme ? 'dark' : 'light'}`}
            >
              <div className="not-found-view">
                <img
                  src={imageUrl}
                  alt="not found"
                  className="not-found-image"
                />
                <h1
                  className={`not-found-title ${
                    isDarkTheme ? 'dark-text' : ''
                  }`}
                >
                  Page Not Found
                </h1>
                <p className="not-found-description">
                  We are sorry, the page you requested could not be found.
                </p>
              </div>
            </div>
          </div>
        </>
      )
    }}
  </ThemeAndVideoContext.Consumer>
)

export default NotFound
