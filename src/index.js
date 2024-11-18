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
            console.error('Error with response')
        }
        const weatherData = await response.json()
        console.log(weatherData)
    } catch(error) {
        console.error('Cought an error')
    }

}

createForm()

const form = document.getElementById('search-location')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    getWeather()
})

