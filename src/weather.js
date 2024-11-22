import { displayWeather, createForm } from './render'
import { getLocation } from './helper'

async function getWeather() {
    const key = '88GTR4YP9S7U2QHX337V2YRPE'
    const search = document.getElementById('search-city')
    const location = getLocation(search)
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${key}`
    try {
        const response = await fetch(url)
        if(!response.ok) {
            console.error('Error with response:', response.statusText)
        }
        const weatherData = await response.json()
        return weatherData
    } catch(error) {
        console.error('An error occurred:', error)
    }
}

export function getWeatherByLocation() {
    createForm()
    const form = document.querySelector('form')

    form.addEventListener('submit', async (e) => {
        e.preventDefault()
        const weatherData = await getWeather()
        if (weatherData) {
            console.log(weatherData)
            displayWeather(weatherData)
        } else {
            console.error('No weather data available for this location')
        }
    })
}