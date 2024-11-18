import { toCelsius, clear } from './helper'
import searchIcon from './icons/search.svg'

export function displayWeather(data) {
    const body = document.querySelector('body')
    clear(body)

    const container = document.createElement('div')
    container.setAttribute('class', 'weather-container')
    body.appendChild(container)

    const switchLabel = document.createElement('label')
    switchLabel.setAttribute('class', 'switch')
    switchLabel.innerHTML = `<input type="checkbox" id="toggle-temp-format">
    <span class="slider round"></span>`    

    const locationCity = document.createElement('h1')
    const city = data.resolvedAddress.split(', ')[0]
    locationCity.textContent = city
    container.appendChild(locationCity)

    const locationCountry = document.createElement('h2')
    const country = data.resolvedAddress.split(',').slice(1)
    locationCountry.textContent = country
    container.appendChild(locationCountry)

    const currentWeather = document.createElement('h2')
    currentWeather.textContent = data.currentConditions.conditions
    container.appendChild(currentWeather)

    const temperature = document.createElement('h2')
    temperature.setAttribute('id', 'temperature')
    const tempFahrenheit = data.currentConditions.temp.toFixed(0)
    const tempCelsius = toCelsius(tempFahrenheit)
    temperature.textContent = `Temp: ${tempCelsius}°C`
    container.appendChild(temperature)

    const feelsLike = document.createElement('h2');
    feelsLike.setAttribute('id', 'felt-temperature');
    const feelsLikeFahrenheit = data.currentConditions.feelslike.toFixed(0)
    const feelsLikeCelsius = toCelsius(feelsLikeFahrenheit)
    feelsLike.textContent = `Feels like: ${feelsLikeCelsius}°C`
    container.appendChild(feelsLike)
    
    container.appendChild(switchLabel)
    const switchElement = document.getElementById('toggle-temp-format')

    switchElement.addEventListener('change', () => {
        if (switchElement.checked) {
            temperature.textContent = `Temp: ${tempFahrenheit}°F`
            feelsLike.textContent = `Feels like: ${feelsLikeFahrenheit}°F`
        } else {
            temperature.textContent = `Temp: ${tempCelsius}°C`
            feelsLike.textContent = `Feels like: ${feelsLikeCelsius}°C`
        }
    })

    const weatherDescription = document.createElement('p')
    weatherDescription.textContent = data.description
    container.appendChild(weatherDescription)
}

export function createForm() { 
    const body = document.querySelector('body')
    const form = document.createElement('form')
    form.setAttribute('id', 'search-location')

    const title = document.createElement('h1')
    title.textContent = "What's the weather today in..."

    body.appendChild(form)
    form.append(title)

    form.innerHTML += `<label for="location">
    <input type="text" placeholder="Enter a city" id="search-city" required>
    <button type="submit"><img src="${searchIcon}" id="search-icon"></button>`
}