import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = (props) => {
    const [ weather, setWeather ] = useState([])
    //const [ query, setQuery ] = useState('http://api.weatherstack.com/current?access_key=811a6244c4fd4fba2cf2888b46f366fb&query=')
    
    useEffect(() => {
        let query = 'http://api.weatherstack.com/current?access_key=811a6244c4fd4fba2cf2888b46f366fb&query=' + props.capital
        console.log('weather effect')
        console.log(query)
        
        axios
            .get(query)
            .then(response => {
                console.log('weather promise fulfilled')
                console.log(response.data.current)
                
                setWeather(response.data.current)
            })
    }, [])
    
    return (
        <div className='weather'>
            <h3>Weather in {props.capital}</h3>
            <img src={weather.weather_icons} alt='weather icon' width='50'></img>
            <p>{weather.weather_descriptions}</p>
            <p>Temperature: {weather.temperature}</p>
            <p>Wind: {weather.wind_speed}</p>
        </div>
    )
}

export default Weather