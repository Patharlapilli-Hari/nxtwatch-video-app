import React from 'react'

const ThemeAndVideoContext = React.createContext({
  isDarkTheme: false,
  savedVideosList: [],
  toggleTheme: () => {},
  addSavedVideo: () => {},
  removeSavedVideo: () => {},
})

export default ThemeAndVideoContext
