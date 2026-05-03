import {Link} from 'react-router-dom'
import './index.css'

const VideoCard = props => {
  const {videoDetails} = props
  const {
    id,
    title,
    thumbnailUrl,
    viewCount,
    publishedAt,
    channel,
  } = videoDetails

  return (
    <li className="video-card">
      <Link to={`/videos/${id}`} className="video-link">
        <img
          src={thumbnailUrl}
          alt="video thumbnail"
          className="video-thumbnail"
        />
        <div className="video-info-row">
          <img
            src={channel.profileImageUrl}
            alt="channel logo"
            className="channel-logo"
          />
          <div>
            <p className="video-title">{title}</p>
            <p className="video-meta">{channel.name}</p>
            <p className="video-meta">
              {viewCount} views . {publishedAt}
            </p>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default VideoCard
