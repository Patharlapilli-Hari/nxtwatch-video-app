import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import {BiLike, BiDislike, BiListPlus} from 'react-icons/bi'

import Header from '../Header'
import Sidebar from '../Sidebar'
import FailureView from '../FailureView'
import ThemeAndVideoContext from '../../context/ThemeAndVideoContext'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoItemDetails extends Component {
  state = {
    videoDetails: null,
    apiStatus: apiStatusConstants.initial,
    isLiked: false,
    isDisliked: false,
  }

  componentDidMount() {
    this.getVideoDetails()
  }

  getFormattedData = data => ({
    id: data.id,
    title: data.title,
    videoUrl: data.video_url,
    thumbnailUrl: data.thumbnail_url,
    viewCount: data.view_count,
    publishedAt: data.published_at,
    description: data.description,
    channel: {
      name: data.channel.name,
      profileImageUrl: data.channel.profile_image_url,
      subscriberCount: data.channel.subscriber_count,
    },
  })

  getVideoDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {id} = match.params

    const response = await fetch(`https://apis.ccbp.in/videos/${id}`, {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    })

    if (response.ok) {
      const data = await response.json()
      this.setState({
        videoDetails: this.getFormattedData(data.video_details),
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickLike = () => {
    this.setState(prevState => ({
      isLiked: !prevState.isLiked,
      isDisliked: false,
    }))
  }

  onClickDislike = () => {
    this.setState(prevState => ({
      isDisliked: !prevState.isDisliked,
      isLiked: false,
    }))
  }

  renderSuccessView = (contextValue, isDarkTheme) => {
    const {videoDetails, isLiked, isDisliked} = this.state
    const {savedVideosList, addSavedVideo, removeSavedVideo} = contextValue

    const isSaved = savedVideosList.some(
      eachVideo => eachVideo.id === videoDetails.id,
    )

    const onClickSave = () => {
      if (isSaved) {
        removeSavedVideo(videoDetails.id)
      } else {
        addSavedVideo(videoDetails)
      }
    }

    return (
      <div className={`video-details-card ${isDarkTheme ? 'dark' : 'light'}`}>
        <ReactPlayer url={videoDetails.videoUrl} width="100%" controls />

        <p className={`details-title ${isDarkTheme ? 'dark-text' : ''}`}>
          {videoDetails.title}
        </p>

        <div className="details-meta-row">
          <p className="details-meta">
            {videoDetails.viewCount} views . {videoDetails.publishedAt}
          </p>

          <div className="action-buttons">
            <button
              type="button"
              className="action-button"
              style={{color: isLiked ? '#2563eb' : '#64748b'}}
              onClick={this.onClickLike}
            >
              <BiLike /> Like
            </button>

            <button
              type="button"
              className="action-button"
              style={{color: isDisliked ? '#2563eb' : '#64748b'}}
              onClick={this.onClickDislike}
            >
              <BiDislike /> Dislike
            </button>

            <button
              type="button"
              className="action-button"
              style={{color: isSaved ? '#2563eb' : '#64748b'}}
              onClick={onClickSave}
            >
              <BiListPlus /> {isSaved ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>

        <hr className="details-separator" />

        <div className="channel-row">
          <img
            src={videoDetails.channel.profileImageUrl}
            alt="channel logo"
            className="details-channel-logo"
          />
          <div>
            <p className={`channel-name ${isDarkTheme ? 'dark-text' : ''}`}>
              {videoDetails.channel.name}
            </p>
            <p className="details-meta">
              {videoDetails.channel.subscriberCount} subscribers
            </p>
            <p className={`description ${isDarkTheme ? 'dark-text' : ''}`}>
              {videoDetails.description}
            </p>
          </div>
        </div>
      </div>
    )
  }

  renderContent = (contextValue, isDarkTheme) => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        )
      case apiStatusConstants.success:
        return this.renderSuccessView(contextValue, isDarkTheme)
      case apiStatusConstants.failure:
        return <FailureView onRetry={this.getVideoDetails} />
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
                >
                  {this.renderContent(value, isDarkTheme)}
                </div>
              </div>
            </>
          )
        }}
      </ThemeAndVideoContext.Consumer>
    )
  }
}

export default VideoItemDetails
