import Skeleton from '../../components/Skeleton'
import Selector from '../../components/Selector'
import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import { Container, SettingsContainer, CountriesContainer, TextContainer, Country, ErrorText } from '../../components/Styles'
import { Link } from 'react-router-dom'
import useCountries from '../../utils/useCountries'


export default function HomePage() {
    const url = `https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca3`
    const [data, loading, error] = useCountries(url)

    const [selectedRegion, setSelectedRegion] = useState(null);
    const [filteredList, setFilteredList] = useState([])

    useEffect(() => {
        if (selectedRegion) {
            let filteredCountries = data.filter((country) => {
                return country.region === selectedRegion
            })
            setFilteredList(filteredCountries)
        }
    }, [selectedRegion])

    function handleSearch(e) {
        const searchCountry = e.target.value
        let filteredCountries = data.filter((country) => {
            return country.name.official.toLowerCase().includes(searchCountry.toLowerCase()) ||
                country.name.common.toLowerCase().includes(searchCountry.toLowerCase())
        })
        if (filteredCountries.length > 0) { setFilteredList(filteredCountries) }
        else { setFilteredList('Nothing was found') }
    }


    function displayedCountries(arr) {
        if (!arr) { return; }
        if (typeof arr === 'string') { return <ErrorText>{arr}</ErrorText> }
        const countries = arr
            .sort((a, b) => a.name.common.localeCompare(b.name.common))
            .map(({ name, flags, population, region, capital }) => {
                return (
                    <Country key={nanoid()}>
                        <Link to={`/countries/${name.common.toLowerCase()}`}>
                            <img src={flags.svg} alt={name.common + "'s flag"} />
                        </Link>
                        <TextContainer className="text">
                            <h2>{name.common}</h2>
                            <p>Population: <span>{population.toLocaleString()}</span></p>
                            <p>Region: <span>{region}</span></p>
                            <p>Capital: <span>{capital}</span></p>
                        </TextContainer>
                    </Country>
                )
            })
        return countries
    }

    return (
        <Container>
            <SettingsContainer >
                <input type="text" placeholder="Search for a country..." onChange={handleSearch} />
                <Selector selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} />
            </SettingsContainer>
            {error && <ErrorText>{error}</ErrorText>}
            {
                loading ? <Skeleton width={"262px"} height={"363px"} number={9} /> :
                    <CountriesContainer>
                        {filteredList.length ? displayedCountries(filteredList) : displayedCountries(data)}
                    </CountriesContainer>
            }
        </Container>
    )
}
