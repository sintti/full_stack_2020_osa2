import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/Search'
import Countries from './components/Countries'

const App = () => {
    const [ countries, setCountries ] = useState([])
    const [ newSearch, setNewSearch ] = useState('')
    const [ showAll, setShowAll ] = useState()
    
    useEffect(() => {
        console.log('effect käynnistyy')
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                console.log('promise fulfilled')
                setCountries(response.data)
                console.log(response.data)
                
            })
        
    }, [])
    
    const searchChangeListener = (event) => {
        setNewSearch(event.target.value)
    }
    
    //console.log(newSearch)
    
    
    const countriesToShow = showAll
        ? countries
        : countries.filter(country => country.name.includes(newSearch))
        
    return (
        <div>
            <h2>Search for countries</h2>
            <Search newSearch={newSearch} searchChangeListener={searchChangeListener} />
            <Countries countries={countriesToShow} />
        </div>
    )
}

export default App

