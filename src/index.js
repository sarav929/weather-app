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
    temperature.textContent = `Temp: ${data.currentConditions.temp.toFixed(0)}°`
    container.appendChild(temperature)

    const feelsLike = document.createElement('h2')
    feelsLike.setAttribute('id', 'felt-temperature')
    feelsLike.textContent = `Feels like: ${data.currentConditions.feelslike.toFixed(0)}°`
    container.appendChild(feelsLike)

    const weatherDescription = document.createElement('p')
    weatherDescription.textContent = data.description
    container.appendChild(weatherDescription)
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

