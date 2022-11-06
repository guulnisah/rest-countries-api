import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { BackButton, Container, CountryDetails, CountryInformation } from '../components/Styles'
import getFullName from '../components/cca3ToName.js'
import Skeleton from '../components/Skeleton'

export default function CountryPage() {
    const [country, setCountry] = useState()
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`https://restcountries.com/v3.1/alpha/${id}`)
            .then(res => res.json())
            .then(data => {
                setCountry(data[0])
            })
    }, [])

    const { name, population, region, subregion, capital, tld, currencies, languages, borders, flags } = country ? country : {}
    const { nativeName } = name ? name : {}
    const lang = nativeName ? Object.keys(nativeName)[0] : ''
    const curr = currencies ? Object.keys(currencies)[0].toUpperCase() : ''

    const borderingCountries = borders ?
        borders.map(elem => {
            return (
                <Link key={nanoid()} to={`/countries/${elem}`} >
                    <span className='borders'>
                        {/*API gives bordered countries as cca3 code
                    so we need to convert it*/}
                        {getFullName(elem)}
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
                {country ?
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
                                    <p>Languages: <span>{languages[lang]}</span></p>
                                </div>
                            </div>
                            {borders ?
                                <p>Border Countries: {borderingCountries}</p> :
                                <p>No Bordering Countries</p>
                            }
                        </CountryDetails>
                    </CountryInformation>
                    : <Skeleton width={"100%"} height={"300px"} number={1} />
                }
            </Container>
        </section>
    )
}