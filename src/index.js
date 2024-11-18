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

    const container = document.createElement('div')
    container.setAttribute('class', 'weather-container')
    body.appendChild(container)

    const address = document.createElement('h1')
    address.textContent = data.address
    container.appendChild(address)

    const currentWeather = document.createElement('h2')
    currentWeather.textContent = data.currentConditions.conditions
    container.appendChild(currentWeather)

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
        const response = await fetch(url, {mod: 'CORS'})
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

form.addEventListener('submit', (e) => {
    e.preventDefault()
    getWeather()
    .then(weatherData => {
        if (weatherData) {
            displayWeather(weatherData)
        } else {
            console.error('No weather data available for this location')
        }
    })
    .catch(error => {
        console.error('Error occurred while fetching data:', error)
    })
})

