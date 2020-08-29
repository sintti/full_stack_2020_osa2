import React from 'react'

const Language = ({language}) => {
    return (
        <li>{language.name}</li>
    )
}

const Country = (props) => {
    return (
        <div>
            <h2>{props.country.name}</h2>
            <p>Capital: {props.country.capital}</p>
            <p>Population: {props.country.population}</p>
            <h3>Languages</h3>
            <ul>
                {props.country.languages.map(language =>
                  <Language language={language} />  
                )}
            </ul>
            <img src={props.country.flag} alt="flag" width='100'></img>
        </div>
    )
}

export default Country