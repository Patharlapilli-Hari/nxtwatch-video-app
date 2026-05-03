import {Link} from 'react-router-dom'

import './index.css'

const GamingVideoCard = props => {
  const {videoDetails} = props
  const {id, title, thumbnailUrl, viewCount} = videoDetails

  return (
    <li className="gaming-card">
      <Link to={`/videos/${id}`}>
        <img
          src={thumbnailUrl}
          alt="video thumbnail"
          className="gaming-thumbnail"
        />
        <p className="gaming-title">{title}</p>
        <p className="gaming-views">{viewCount} Watching Worldwide</p>
      </Link>
    </li>
  )
}

export default GamingVideoCard
