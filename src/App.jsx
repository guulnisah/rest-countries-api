import { useState, useEffect } from 'react'
import { GlobalStyle, appTheme } from './components/Styles'
import Header from './components/Header'
import { ThemeProvider } from 'styled-components'
import { Routes, Route, Navigate } from 'react-router-dom'

import Home from './pages/Home'
import Country from './pages/Country'
import NotFound from './pages/NotFound'


export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(window.matchMedia("(prefers-color-scheme:dark)").matches)

  function handleDarkMode() {
    setIsDarkMode(prevMode => !prevMode)
  }

  return (
    <>
      <ThemeProvider theme={isDarkMode ? appTheme.dark : appTheme.light}>
        <GlobalStyle />
        <Header handleDarkMode={handleDarkMode} />
        <Routes>
          <Route path="/" element={<Navigate to="/countries" />} />
          <Route path="/countries" element={<Home />} />
          <Route path="/countries/:id" element={<Country />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </>
  )
}


