import { nanoid } from 'nanoid'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components'
import Selector from './Selector'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ isDarkMode }) => (isDarkMode ? '#202C36' : '#FAFAFA')};
    font-family: 'Nunito Sans', sans-serif;
  }
`

const Header = styled.header`
  background-color: ${({ isDarkMode }) => (isDarkMode ? '#2B3844' : '#FFFFFF')};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.0562443);
  height: 5rem; 
  margin-bottom: 3rem;
  
  nav {
    max-width: 90%;
    margin: 0 auto;
    padding-top: 1.43rem;
    padding-bottom: 1.43rem;
    display: flex;
    justify-content: space-between;
    color: ${({ isDarkMode }) => (isDarkMode ? '#FFF' : '#111517')};
    
    h1 {
      font-style: normal;
      font-weight: 800;
      font-size: 24px;
      line-height: 1.38;
    }
    
    div {
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      
        path {
          stroke: ${({ isDarkMode }) => (isDarkMode ? 'none' : '#111517')};
        }
      }
    }
`


const Country = styled.article`
  background-color: ${({ isDarkMode }) => (isDarkMode ? '#2B3844' : '#FFFFFF')};
  box-shadow: 0px 0px 7px 2px rgba(0, 0, 0, 0.0294384);
  border-radius: 5px;
  
  .text {
    padding: 24px 0 46px 24px;
    color: ${({ isDarkMode }) => (isDarkMode ? '#FFF' : '#111517')};
  }
  
  h2 {
    margin-bottom: 1rem;
    font-weight: 800;
    font-size: 1.125rem;
    line-height: 1.44;
  }
  
  p {
    margin-bottom: 0.5rem;
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 120%;
  }
  
  span {
    font-weight: 300;
    font-size: 0.875rem;
    line-height: 1.14;
  }
  
  img {
    padding: 0;
    width: 100%;
    min-height: 48%;
    object-fit: cover;
    border-radius: 5px 5px 0 0;
  }
`

const SettingsContainer = styled.div`
  position: relative;
  height: 56px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
  input {
    all: unset;
    width: 25%;
    padding: 1.125rem;
    padding-left: 74px;
    background-color: ${({ isDarkMode }) => (isDarkMode ? '#2B3844' : '#FFFFFF')};
    box-shadow: 0px 2px 9px rgba(0, 0, 0, 0.0532439);
    border-radius: 5px;
    font-size: 0.875rem;
    line-height: 1.43;
    color: ${({ isDarkMode }) => (isDarkMode ? '#FFF' : '#111517')};
    background-image: url('../public/search.svg');
    background-size: 1.25rem;
    background-repeat: no-repeat;
    background-position: 32px 19px;
  }
  
  select {
    background-color: ${({ isDarkMode }) => (isDarkMode ? '#2B3844' : '#FFFFFF')};
    border: none;
    box-shadow: 0px 2px 9px rgba(0, 0, 0, 0.0532439);
    border-radius: 5px;
    font-size: 14px;
    line-height: 1.43;
    color: ${({ isDarkMode }) => (isDarkMode ? '#FFF' : '#111517')};
  }
`

const Container = styled.main`
  max-width: 90%;
  margin: 0 auto;
`

const CountriesContainer = styled.section`
  margin: 0 auto;
  display: grid;
  gap: 75px;
   
  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
`

export default function App() {

  const [countriesData, setCountriesData] = useState([])
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [filteredList, setFilteredList] = useState([])

  function handleDarkMode() {
    setIsDarkMode(prevMode => !prevMode)
  }

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital`)
      .then(res => res.json())
      .then(data => {
        setCountriesData(data)
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

  function handleSearch(e) {
    const searchCountry = e.target.value
    let filteredCountries = countriesData.filter((country) => {
      return country.name.official.toLowerCase().includes(searchCountry.toLowerCase()) ||
        country.name.common.toLowerCase().includes(searchCountry.toLowerCase())
    })
    setFilteredList(filteredCountries)
  }


  function displayedCountries(arr) {
    const countries = arr.map(({ name, flags, population, region, capital }) => {
      return (
        <Country isDarkMode={isDarkMode} key={nanoid()}>
          <img src={flags.png} alt={name.common + "'s flag"} />
          <div className="text">
            <h2>{name.official}</h2>
            <p>Population: <span>{population.toLocaleString()}</span></p>
            <p>Region: <span>{region}</span></p>
            <p>Capital: <span>{capital}</span></p>
          </div>
        </Country>
      )
    })
    return countries
  }


  return (
    <>
      <GlobalStyle isDarkMode={isDarkMode} />
      <Header isDarkMode={isDarkMode}>
        <nav>
          <h1>Where in the world?</h1>
          <div onClick={handleDarkMode}>
            <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M12.5532 11.815C8.66857 11.815 5.51929 8.92783 5.51929 5.36821C5.51929 4.0253 5.96679 2.78158 6.73143 1.75C3.69036 2.69515 1.5 5.33122 1.5 8.43807C1.5 12.3385 4.94929 15.5 9.20357 15.5C12.5929 15.5 15.4696 13.4932 16.5 10.7045C15.375 11.4048 14.0161 11.815 12.5532 11.815Z" fill="white" stroke="#111517" strokeWidth="1.25" />
            </svg>
            <span>Dark Mode</span>
          </div>
        </nav>
      </Header>
      <Container>

        <SettingsContainer isDarkMode={isDarkMode}>
          <input type="text" placeholder="Search for a country..." onChange={handleSearch} />
          <Selector isDarkMode={isDarkMode} selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} />
        </SettingsContainer>

        <CountriesContainer>
          {filteredList.length > 0 ? displayedCountries(filteredList) : displayedCountries(countriesData)}
        </CountriesContainer>
      </Container>
    </>
  )
}
