import {AiOutlineFire} from 'react-icons/ai'

import Header from '../Header'
import Sidebar from '../Sidebar'
import SavedVideoCard from '../SavedVideoCard'
import ThemeAndVideoContext from '../../context/ThemeAndVideoContext'

import './index.css'

const SavedVideos = () => (
  <ThemeAndVideoContext.Consumer>
    {value => {
      const {isDarkTheme, savedVideosList} = value

      const renderEmptyView = () => (
        <div className="saved-empty-view">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
            alt="no saved videos"
            className="saved-empty-image"
          />
          <h1 className={`saved-empty-title ${isDarkTheme ? 'dark-text' : ''}`}>
            No saved videos found
          </h1>
          <p className="saved-empty-description">
            You can save your videos while watching them
          </p>
        </div>
      )

      const renderVideosView = () => (
        <>
          <div className={`route-header ${isDarkTheme ? 'dark' : 'light'}`}>
            <div className="route-icon-box">
              <AiOutlineFire className="route-icon" />
            </div>
            <h1 className={`route-title ${isDarkTheme ? 'dark' : ''}`}>
              Saved Videos
            </h1>
          </div>
          <ul className="saved-list">
            {savedVideosList.map(eachVideo => (
              <SavedVideoCard key={eachVideo.id} videoDetails={eachVideo} />
            ))}
          </ul>
        </>
      )

      return (
        <>
          <Header />
          <div className="app-layout">
            <Sidebar />
            <div
              className={`route-container ${isDarkTheme ? 'dark' : 'light'}`}
              data-testid="savedVideos"
            >
              {savedVideosList.length === 0
                ? renderEmptyView()
                : renderVideosView()}
            </div>
          </div>
        </>
      )
    }}
  </ThemeAndVideoContext.Consumer>
)

export default SavedVideos
