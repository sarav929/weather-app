import { displayWeather, createForm } from './render'
import { getLocation } from './helper'

async function getWeather() {
    const key = '88GTR4YP9S7U2QHX337V2YRPE'
    const search = document.getElementById('search-city')
    const location = getLocation(search)
    const errorMessage = document.getElementById('error-message')
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${key}`
    try {
        const response = await fetch(url)
        if(!response.ok) {
            errorMessage.textContent = `Error with response: ${response.statusText}`
        }
        const weatherData = await response.json()
        return weatherData
    } catch(error) {
        errorMessage.textContent = `An error occurred: ${error}`
    }
}

export function getWeatherByLocation() {
    createForm()
    const form = document.querySelector('form')
    const input = document.querySelector('input')
    const errorMessage = document.getElementById('error-message')

    form.addEventListener('submit', async (e) => {
        e.preventDefault()
        const weatherData = await getWeather()
        if (!weatherData) {
            form.classList.add('input-error')
            errorMessage.textContent = 'No weather data available, enter a valid location.'
            
            input.addEventListener('input', () => { 
                errorMessage.textContent = ''
                input.textContent = ''
                form.classList.remove('input-error')
            })
        } else {
            displayWeather(weatherData)
        }

        if (!input.checkValidity()) {
            errorMessage.textContent = input.validationMessage
            form.classList.add('input-error')
            input.addEventListener('input', () => { 
                errorMessage.textContent = ''
                input.textContent = ''
                form.classList.remove('input-error')
            })
        } else {
            form.classList.remove('input-error')
        }
    })
}