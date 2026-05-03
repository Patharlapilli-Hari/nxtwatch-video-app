import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {IoMdClose} from 'react-icons/io'

import Header from '../Header'
import Sidebar from '../Sidebar'
import VideoCard from '../VideoCard'
import FailureView from '../FailureView'
import ThemeAndVideoContext from '../../context/ThemeAndVideoContext'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    searchInput: '',
    videosList: [],
    apiStatus: apiStatusConstants.initial,
    showBanner: true,
  }

  componentDidMount() {
    this.getVideos()
  }

  getFormattedData = eachVideo => ({
    id: eachVideo.id,
    title: eachVideo.title,
    thumbnailUrl: eachVideo.thumbnail_url,
    publishedAt: eachVideo.published_at,
    viewCount: eachVideo.view_count,
    channel: {
      name: eachVideo.channel.name,
      profileImageUrl: eachVideo.channel.profile_image_url,
    },
  })

  getVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')

    const response = await fetch(
      `https://apis.ccbp.in/videos/all?search=${searchInput}`,
      {
        headers: {Authorization: `Bearer ${jwtToken}`},
        method: 'GET',
      },
    )

    if (response.ok) {
      const data = await response.json()
      this.setState({
        videosList: data.videos.map(this.getFormattedData),
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  closeBanner = () => {
    this.setState({showBanner: false})
  }

  renderSuccessView = isDarkTheme => {
    const {videosList} = this.state

    if (videosList.length === 0) {
      return (
        <div className="home-empty-view">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
            alt="no videos"
            className="home-empty-image"
          />
          <h1 className={`empty-title ${isDarkTheme ? 'dark-text' : ''}`}>
            No Search results found
          </h1>
          <p className="empty-description">
            Try different key words or remove search filter
          </p>
          <button
            type="button"
            className="route-retry-button"
            onClick={this.getVideos}
          >
            Retry
          </button>
        </div>
      )
    }

    return (
      <ul className="home-videos-list">
        {videosList.map(eachVideo => (
          <VideoCard key={eachVideo.id} videoDetails={eachVideo} />
        ))}
      </ul>
    )
  }

  renderContent = isDarkTheme => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        )
      case apiStatusConstants.success:
        return this.renderSuccessView(isDarkTheme)
      case apiStatusConstants.failure:
        return <FailureView onRetry={this.getVideos} />
      default:
        return null
    }
  }

  render() {
    const {searchInput, showBanner} = this.state

    return (
      <ThemeAndVideoContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          return (
            <>
              <Header />
              <div className="app-layout">
                <Sidebar />
                <div
                  className={`route-container ${
                    isDarkTheme ? 'dark' : 'light'
                  }`}
                  data-testid="home"
                >
                  {showBanner ? (
                    <div className="banner" data-testid="banner">
                      <button
                        type="button"
                        className="banner-close-button"
                        data-testid="close"
                        onClick={this.closeBanner}
                      >
                        <IoMdClose />
                      </button>
                      <div className="banner-content">
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                          alt="nxt watch logo"
                          className="banner-logo"
                        />
                        <p className="banner-text">
                          Buy Nxt Watch Premium prepaid plans with UPI
                        </p>
                        <button type="button" className="banner-button">
                          GET IT NOW
                        </button>
                      </div>
                    </div>
                  ) : null}
                  <div className="search-container">
                    <input
                      type="search"
                      value={searchInput}
                      onChange={this.onChangeSearch}
                      className="search-input"
                    />
                    <button
                      type="button"
                      data-testid="searchButton"
                      className="search-button"
                      onClick={this.getVideos}
                    >
                      Search
                    </button>
                  </div>
                  {this.renderContent(isDarkTheme)}
                </div>
              </div>
            </>
          )
        }}
      </ThemeAndVideoContext.Consumer>
    )
  }
}

export default Home
