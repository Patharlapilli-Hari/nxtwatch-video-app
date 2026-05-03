import ThemeAndVideoContext from '../../context/ThemeAndVideoContext'

import './index.css'

const FailureView = props => {
  const {onRetry} = props

  return (
    <ThemeAndVideoContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const imageUrl = isDarkTheme
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'

        return (
          <div className="failure-view">
            <img src={imageUrl} alt="failure view" className="failure-image" />
            <h1 className="failure-heading">Oops! Something Went Wrong</h1>
            <p className="failure-text">
              We are having some trouble to complete your request. Please try
              again.
            </p>
            <button type="button" className="retry-button" onClick={onRetry}>
              Retry
            </button>
          </div>
        )
      }}
    </ThemeAndVideoContext.Consumer>
  )
}

export default FailureView
