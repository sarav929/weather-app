import { toCelsius, clear } from './helper'
import searchIcon from './img/search.svg'
import backIcon from './img/back.svg'
import { getWeatherByLocation } from './weather'

export function displayWeather(data) {
    const body = document.querySelector('body')
    clear(body)
    
    const overlay = document.createElement('div')
    overlay.setAttribute('class', 'overlay')
    body.appendChild(overlay)

    const header = document.createElement('header')
    body.appendChild(header)

    const backBtn = document.createElement('img')
    backBtn.src = backIcon
    backBtn.setAttribute('id', 'back-button')
    header.appendChild(backBtn)

    backBtn.addEventListener('click', () => {
        clear(body)
        getWeatherByLocation()
    })

    const wrapper = document.createElement('div')
    wrapper.setAttribute('class', 'wrapper')
    body.appendChild(wrapper)

    const container = document.createElement('div')
    container.setAttribute('class', 'weather-container')

    const iconDiv = document.createElement('div')
    iconDiv.setAttribute('class', 'weather-icon')
    const iconImg = document.createElement('img')
    iconImg.src = `icons/${data.currentConditions.icon}.png`
    iconDiv.appendChild(iconImg)

    wrapper.appendChild(iconDiv)
    wrapper.appendChild(container)

    const switchLabel = document.createElement('label')
    switchLabel.setAttribute('class', 'switch')
    switchLabel.innerHTML = `<input type="checkbox" id="toggle-temp-format">
    <span class="slider round"></span>`    

    const locationCity = document.createElement('h1')
    locationCity.setAttribute('id', 'city')
    const city = data.resolvedAddress.split(', ')[0]
    locationCity.textContent = city
    container.appendChild(locationCity)

    const locationCountry = document.createElement('h2')
    locationCountry.setAttribute('id', 'country')
    const country = data.resolvedAddress.split(',').slice(1)
    locationCountry.textContent = country
    container.appendChild(locationCountry)

    const currentWeather = document.createElement('h2')
    currentWeather.setAttribute('id', 'current-weather')
    currentWeather.textContent = data.currentConditions.conditions
    container.appendChild(currentWeather)

    const temperature = document.createElement('h2')
    temperature.setAttribute('id', 'temperature')
    const tempFahrenheit = data.currentConditions.temp.toFixed(0)
    const tempCelsius = toCelsius(tempFahrenheit)
    temperature.textContent = `${tempCelsius}°C`
    container.appendChild(temperature)

    const feelsLike = document.createElement('h2');
    feelsLike.setAttribute('id', 'felt-temperature');
    const feelsLikeFahrenheit = data.currentConditions.feelslike.toFixed(0)
    const feelsLikeCelsius = toCelsius(feelsLikeFahrenheit)
    feelsLike.textContent = `Feels like ${feelsLikeCelsius}°C`
    container.appendChild(feelsLike)
    
    header.appendChild(switchLabel)
    const switchElement = document.getElementById('toggle-temp-format')

    switchElement.addEventListener('change', () => {
        if (switchElement.checked) {
            temperature.textContent = `${tempFahrenheit}°F`
            feelsLike.textContent = `Feels like ${feelsLikeFahrenheit}°F`
        } else {
            temperature.textContent = `${tempCelsius}°C`
            feelsLike.textContent = `Feels like ${feelsLikeCelsius}°C`
        }
    })

    const weatherDescription = document.createElement('p')
    weatherDescription.setAttribute('id', 'weather-description')
    weatherDescription.textContent = data.description
    container.appendChild(weatherDescription)

    displayForecast(data)
}

function displayForecast(data) {

    console.log(data)

    const body = document.querySelector('body')

    const title = document.createElement('h1')
    title.setAttribute('id', 'seven-days-forecast')
    title.textContent = '7 Days Forecast'
    body.appendChild(title)

    const wrapper = document.createElement('div')
    wrapper.setAttribute('class', 'row')
    wrapper.setAttribute('id', 'forecast-wrapper')
    body.appendChild(wrapper)

    const sevenDaysData = []
    for (let i = 0; i < 7; i++) {
        sevenDaysData.push(data.days[i])
    }

    for (let i = 0; i < sevenDaysData.length; i++) {
        let forecastDiv = document.createElement('div')
        forecastDiv.setAttribute('class', 'col')
        wrapper.appendChild(forecastDiv)

        let dayDiv = document.createElement('div')
        dayDiv.setAttribute('class', 'day-container')
        let dateObj = new Date(sevenDaysData[i].datetime)
        dayDiv.innerHTML = `${dateObj.toLocaleDateString("en-UK", { weekday: "long" })} <br> 
        ${dateObj.getDate()} - ${dateObj.getMonth()} `
        forecastDiv.appendChild(dayDiv)

        let weatherDiv = document.createElement('div')
        weatherDiv.setAttribute('class', 'weather-icon-container')
        weatherDiv.innerHTML = `<img src="icons/${sevenDaysData[i].icon}.png">`
        forecastDiv.appendChild(weatherDiv)
    }
    
}

export function createForm() { 
    const body = document.querySelector('body')

    const overlay = document.createElement('div')
    overlay.setAttribute('class', 'overlay')
    body.appendChild(overlay)

    const form = document.createElement('form')
    form.setAttribute('novalidate', true)
    form.setAttribute('id', 'search-location')

    const title = document.createElement('h1')
    title.setAttribute('class', 'homepage-h1')
    title.textContent = "What's the weather today in..."

    body.append(title)
    body.appendChild(form)

    form.innerHTML += `<label for="search-city">
    <button type="submit"><img src="${searchIcon}" id="search-icon"></button>
    <input type="text" placeholder="Enter a city" id="search-city" autocomplete="off" required>`

    const errorMessage = document.createElement('div')
    errorMessage.setAttribute('id', 'error-message')
    body.appendChild(errorMessage)
}