import './styles.css'

function createForm() { 
    const body = document.querySelector('body')
    const form = document.createElement('form')
    form.setAttribute('id', 'search-location')

    body.appendChild(form)

    const search = document.createElement('input')
    search.type = 'text'
    search.setAttribute('id', 'location')
    search.required = true

    form.appendChild(search)

    const searchBtn = document.createElement('button')
    searchBtn.type = 'submit'
    searchBtn.textContent = 'Search'

    form.appendChild(searchBtn)
}

function displayWeather(data) {
    const body = document.querySelector('body')
    body.innerHTML = ''

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

function toCelsius(temp) {
    let celsiusTemp = ((temp - 32) * 5) / 9
    return celsiusTemp.toFixed(0)
}

function toFarenheit(temp) {
    let farenheitTemp = (temp * (9/5)) + 32
    return farenheitTemp.toFixed(0)
}

function getLocation(input) {
    return input.value
}

async function getWeather() {
    const key = '88GTR4YP9S7U2QHX337V2YRPE'
    const search = document.getElementById('location')
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

createForm()

const form = document.getElementById('search-location')

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

