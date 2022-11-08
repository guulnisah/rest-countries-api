import { useState, useEffect } from 'react'
import { GlobalStyle, appTheme } from './components/Styles'
import { ThemeProvider } from 'styled-components'
import { Routes, Route, Navigate } from 'react-router-dom'

import Home from './pages/HomePage'
import CountryPage from './pages/CountryPage'
import NotFound from './pages/NotFound'
import Header from './components/Header'


export default function App() {
  const [countriesData, setCountriesData] = useState([])
  const [isDarkMode, setIsDarkMode] = useState(window.matchMedia("(prefers-color-scheme:dark)").matches)
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [filteredList, setFilteredList] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    fetch(`https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca3`)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        setCountriesData(data)
        setIsLoading(false)
      })
  }, [])


  useEffect(() => {
    if (selectedRegion) {
      let filteredCountries = countriesData.filter((country) => {
        return country.region === selectedRegion
      })
      setFilteredList(filteredCountries)
    }
  }, [selectedRegion])

  function handleDarkMode() {
    setIsDarkMode(prevMode => !prevMode)
  }

  function handleSearch(e) {
    const searchCountry = e.target.value
    let filteredCountries = countriesData.filter((country) => {
      return country.name.official.toLowerCase().includes(searchCountry.toLowerCase()) ||
        country.name.common.toLowerCase().includes(searchCountry.toLowerCase())
    })
    setFilteredList(filteredCountries)
  }

  return (
    <>
      <ThemeProvider theme={isDarkMode ? appTheme.dark : appTheme.light}>
        <GlobalStyle />
        <Header handleDarkMode={handleDarkMode} />
        <Routes>
          <Route path="/" element={<Navigate to="/countries" />} />
          <Route path="/countries" element={
            <Home
              isLoading={isLoading}
              filteredList={filteredList}
              countriesData={countriesData}
              selectedRegion={selectedRegion}
              setSelectedRegion={setSelectedRegion}
              handleSearch={handleSearch} />
          } />
          <Route path="/countries/:id" element={<CountryPage />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </>
  )
}


