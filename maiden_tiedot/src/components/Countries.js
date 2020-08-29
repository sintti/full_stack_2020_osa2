import React from 'react'
import Country from './Country'

const Countries = (props) => {
    if (props.countries.length >= 10) {
        return (
            <p>Too many countries. Specify search.</p>
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