import {Component} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'

import ThemeAndVideoContext from './context/ThemeAndVideoContext'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import VideoItemDetails from './components/VideoItemDetails'
import NotFound from './components/NotFound'

import './App.css'

class App extends Component {
  state = {
    isDarkTheme: false,
    savedVideosList: [],
  }

  toggleTheme = () => {
    this.setState(prevState => ({isDarkTheme: !prevState.isDarkTheme}))
  }

  addSavedVideo = videoDetails => {
    this.setState(prevState => {
      const isVideoSaved = prevState.savedVideosList.some(
        eachVideo => eachVideo.id === videoDetails.id,
      )

      if (isVideoSaved) {
        return null
      }

      return {savedVideosList: [...prevState.savedVideosList, videoDetails]}
    })
  }

  removeSavedVideo = id => {
    this.setState(prevState => ({
      savedVideosList: prevState.savedVideosList.filter(
        eachVideo => eachVideo.id !== id,
      ),
    }))
  }

  render() {
    const {isDarkTheme, savedVideosList} = this.state

    return (
      <ThemeAndVideoContext.Provider
        value={{
          isDarkTheme,
          savedVideosList,
          toggleTheme: this.toggleTheme,
          addSavedVideo: this.addSavedVideo,
          removeSavedVideo: this.removeSavedVideo,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </ThemeAndVideoContext.Provider>
    )
  }
}

export default App
