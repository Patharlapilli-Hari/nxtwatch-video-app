import {Link} from 'react-router-dom'
import './index.css'

const TrendingVideoCard = props => {
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
    <li className="trending-video-card">
      <Link to={`/videos/${id}`} className="trending-link">
        <img
          src={thumbnailUrl}
          alt="video thumbnail"
          className="trending-thumbnail"
        />
        <div className="trending-info">
          <p className="trending-title">{title}</p>
          <p className="trending-meta">{channel.name}</p>
          <p className="trending-meta">
            {viewCount} views . {publishedAt}
          </p>
        </div>
      </Link>
    </li>
  )
}

export default TrendingVideoCard
