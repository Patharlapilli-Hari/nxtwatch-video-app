import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {SiYoutubegaming} from 'react-icons/si'

import Header from '../Header'
import Sidebar from '../Sidebar'
import GamingVideoCard from '../GamingVideoCard'
import FailureView from '../FailureView'
import ThemeAndVideoContext from '../../context/ThemeAndVideoContext'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Gaming extends Component {
  state = {
    videosList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getGamingVideos()
  }

  getFormattedData = eachVideo => ({
    id: eachVideo.id,
    title: eachVideo.title,
    thumbnailUrl: eachVideo.thumbnail_url,
    viewCount: eachVideo.view_count,
  })

  getGamingVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const response = await fetch('https://apis.ccbp.in/videos/gaming', {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    })

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

  renderSuccessView = () => {
    const {videosList} = this.state

    return (
      <ul className="gaming-list">
        {videosList.map(eachVideo => (
          <GamingVideoCard key={eachVideo.id} videoDetails={eachVideo} />
        ))}
      </ul>
    )
  }

  renderContent = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        )
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return <FailureView onRetry={this.getGamingVideos} />
      default:
        return null
    }
  }

  render() {
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
                  data-testid="gaming"
                >
                  <div
                    className={`route-header ${isDarkTheme ? 'dark' : 'light'}`}
                  >
                    <div className="route-icon-box">
                      <SiYoutubegaming className="route-icon" />
                    </div>
                    <h1 className={`route-title ${isDarkTheme ? 'dark' : ''}`}>
                      Gaming
                    </h1>
                  </div>
                  {this.renderContent()}
                </div>
              </div>
            </>
          )
        }}
      </ThemeAndVideoContext.Consumer>
    )
  }
}

export default Gaming
