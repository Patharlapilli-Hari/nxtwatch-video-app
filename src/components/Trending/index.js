import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {AiOutlineFire} from 'react-icons/ai'

import Header from '../Header'
import Sidebar from '../Sidebar'
import TrendingVideoCard from '../TrendingVideoCard'
import FailureView from '../FailureView'
import ThemeAndVideoContext from '../../context/ThemeAndVideoContext'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Trending extends Component {
  state = {
    videosList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTrendingVideos()
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

  getTrendingVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const response = await fetch('https://apis.ccbp.in/videos/trending', {
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
      <ul className="trending-list">
        {videosList.map(eachVideo => (
          <TrendingVideoCard key={eachVideo.id} videoDetails={eachVideo} />
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
        return <FailureView onRetry={this.getTrendingVideos} />
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
                  data-testid="trending"
                >
                  <div
                    className={`route-header ${isDarkTheme ? 'dark' : 'light'}`}
                  >
                    <div className="route-icon-box">
                      <AiOutlineFire className="route-icon" />
                    </div>
                    <h1 className={`route-title ${isDarkTheme ? 'dark' : ''}`}>
                      Trending
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

export default Trending
