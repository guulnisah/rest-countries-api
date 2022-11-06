import { useState, useEffect } from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { Routes, Route, Navigate } from 'react-router-dom'

import Home from './pages/HomePage'
import CountryPage from './pages/CountryPage'
import NotFound from './pages/NotFound'
import Header from './components/Header'

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => (theme.body)};
    font-family: 'Nunito Sans', sans-serif;
    transition: all 0.2s ease;
  }
`

const darkTheme = {
  body: "#202C36",
  highlight: "#2B3844",
  text: "#FFF"
}

const lightTheme = {
  body: "#FAFAFA",
  highlight: "#FFF",
  text: "#111517"
}

export default function App() {

  const [countriesData, setCountriesData] = useState([])
  const [isDarkMode, setIsDarkMode] = useState(window.matchMedia("(prefers-color-scheme:dark)").matches)
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [filteredList, setFilteredList] = useState([])
  const [isLoading, setIsLoading] = useState(false)


  function handleDarkMode() {
    setIsDarkMode(prevMode => !prevMode)
  }

  useEffect(() => {
    setIsLoading(true)
    fetch(`https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca3`)
      .then(res => res.json())
      .then(data => {
        setCountriesData(data)
        setIsLoading(false)
      })
  }, [])

  async function getUserData() {
    try {
      const response = await axios.get("/user_login/john1904");
      console.log(response);
    }
    catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    if (selectedRegion) {
      let filteredCountries = countriesData.filter((country) => {
        return country.region === selectedRegion
      })
      setFilteredList(filteredCountries)
    }
  }, [selectedRegion])

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
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
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


