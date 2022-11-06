import Skeleton from '../components/Skeleton'
import Selector from '../components/Selector'
import { nanoid } from 'nanoid'
import { Container, SettingsContainer, CountriesContainer, TextContainer, Country } from '../components/Styles'
import { Link } from 'react-router-dom'

function displayedCountries(arr) {
    const countries = arr.map(({ name, flags, population, region, capital, cca3 }) => {
        return (
            <Country key={nanoid()}>
                <Link to={`/countries/${cca3}`}>
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

export default function HomePage({ isLoading, filteredList, countriesData, selectedRegion, setSelectedRegion, handleSearch }) {
    return (
        <Container>
            <SettingsContainer >
                <input type="text" placeholder="Search for a country..." onChange={handleSearch} />
                <Selector selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} />
            </SettingsContainer>
            {
                isLoading ? <Skeleton width={"262px"} height={"363px"} number={9} /> :
                    <CountriesContainer>
                        {filteredList.length > 0 ? displayedCountries(filteredList) : displayedCountries(countriesData)}
                    </CountriesContainer>
            }
        </Container>
    )
}
