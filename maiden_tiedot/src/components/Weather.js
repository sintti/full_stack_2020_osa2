import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = (props) => {
    const [ weather, setWeather ] = useState([])
    const api_key = process.env.REACT_APP_API_KEY
    
    useEffect(() => {
        setWeather([])
        axios
            .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${props.capital}`)
            .then(response => {
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