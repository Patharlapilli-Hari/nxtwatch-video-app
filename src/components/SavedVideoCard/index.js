import {Link} from 'react-router-dom'
import './index.css'

const SavedVideoCard = props => {
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
    <li className="saved-video-card">
      <Link to={`/videos/${id}`} className="saved-video-link">
        <img
          src={thumbnailUrl}
          alt="video thumbnail"
          className="saved-video-thumbnail"
        />
        <div className="saved-video-info">
          <p className="saved-video-title">{title}</p>
          <p className="saved-video-meta">{channel.name}</p>
          <p className="saved-video-meta">
            {viewCount} views . {publishedAt}
          </p>
        </div>
      </Link>
    </li>
  )
}

export default SavedVideoCard
