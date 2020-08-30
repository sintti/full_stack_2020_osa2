import React, { useState } from 'react'
import Country from './Country'

const ManyCountries = (props) =>  {
    const [ showCountry, setShowCountry ] = useState(false)
    
    const countryToShow = showCountry
        ? props.country
        : []

    return (
        <div>
            {props.country.name}
            <button onClick={() => setShowCountry(!showCountry)}>
            {showCountry ? 'Hide' : 'Show'}
            </button>
            {showCountry
            ? <div>
            <Country key={countryToShow.alpha2Code} country={countryToShow} />
            </div>
            : ''
            }
        </div>
        
    )
}

const Countries = (props) => {
    if (props.countries.length >= 10) {
        return (
            <p>Too many countries. Specify search.</p>
        )
    } else if (props.countries.length > 1) {
        return (
            <div>
                {props.countries.map(country =>
                <ManyCountries key={country.alpha3Code} country={country} />
            )}
            </div>
        )
    }
    console.log(props)
    
    return (
        <div>
            {props.countries.map(country =>
                <Country key={country.alpha3Code} country={country} />
            )}
        </div>
    )
}

export default Countries