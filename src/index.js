import './styles.css'

const key = '88GTR4YP9S7U2QHX337V2YRPE'
const location = 'London,UK'
const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${key}`

async function getWeather() {
    try {
        const response = await fetch(url, {mod: 'CORS'})
        if(!response.ok) {
            console.error('Error with response')
        }
        const weatherData = await response.json()
        console.log(weatherData)
    } catch(error) {
        console.error('Cought an error')
    }

}

getWeather()
