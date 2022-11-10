import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { BackButton, Container, CountryDetails, CountryInformation } from '../../components/Styles'
import getFullName from '../../utils/cca3ToName.js'
import Skeleton from '../../components/Skeleton'
import useCountries from '../../utils/useCountries'

export default function CountryPage() {
    const navigate = useNavigate()
    const { id } = useParams()
    const url = `https://restcountries.com/v3.1/name/${id}?fullText=true&fields=flags,name,population,region,subregion,tld,currencies,languages,borders`

    // getting fetch results from a custom hook 
    const [data, loading, error] = useCountries(url)

    // destructuring the data
    const country = data ? data[0] : {}
    const { name, population, region, subregion, capital, tld, currencies, languages, borders, flags } = country ? country : {}
    const { nativeName } = name ? name : {}

    // lang and curr are dynamic properties that are different for every country
    const lang = nativeName && Object.keys(nativeName)[0]
    const curr = currencies && Object.keys(currencies)[0]

    // Some countries have more that one language, so we can use this function to display all of them 
    function displayObjectValues(obj) {
        let values = []
        if (!obj) { return; }
        for (const [key, value] of Object.entries(obj)) {
            values.push(value)
        }
        return values.join(', ')
    }

    // Displaying bordering countries
    const borderingCountries = borders ?
        borders.map(elem => {
            {/*API gives bordering countries as cca3 code
                    so we need to convert it */}
            const commonName = getFullName(elem)
            return (
                <Link key={nanoid()} to={`/countries/${commonName.toLowerCase()}`} >
                    <span className='borders'>
                        {commonName}
                    </span>
                </Link >
            )
        })
        : ''

    return (
        <section>
            <Container>

                <BackButton onClick={() => navigate(-1)}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="call-made">
                            <path id="Shape" fillRule="evenodd" clipRule="evenodd" d="M6.46447 4.10744L7.64298 5.28596L3.75389 9.17504L18.6031 9.17504L18.6031 10.825L3.75389 10.825L7.64298 14.714L6.46447 15.8926L0.57191 10L6.46447 4.10744Z" fill="#111517" />
                        </g>
                    </svg>
                    <span>Back</span>
                </BackButton>

                {error && <h2>{error}</h2>}
                {!country && loading && <Skeleton width={"100%"} height={"300px"} number={1} />}

                {/* Display country info if object isn't empty */}
                {Object.keys(country).length !== 0 &&
                    <CountryInformation>
                        <img src={flags.svg} alt={name.common + 's Flag'} />
                        <CountryDetails>
                            <h2>{name.common}</h2>
                            <div className="flex">
                                <div>
                                    <p>Native Name: <span>{name.nativeName[lang].common}</span></p>
                                    <p>Population: <span>{population}</span></p>
                                    <p>Region: <span>{region}</span></p>
                                    <p>Sub Region: <span>{subregion}</span></p>
                                    <p>Capital: <span>{capital}</span></p>
                                </div>
                                <div>
                                    <p>Top Level Domain: <span>{tld}</span></p>
                                    <p>Currencies: <span>{currencies[curr].name}</span></p>
                                    <p>Languages: <span>{displayObjectValues(languages)}</span></p>
                                </div>
                            </div>
                            {borders.length > 0 ?
                                <p>Border Countries: {borderingCountries}</p> :
                                <p>No Bordering Countries</p>
                            }
                        </CountryDetails>
                    </CountryInformation>}

            </Container>
        </section>
    )
}