import './styles.css';
const form = document.createElement('form');
const body = document.querySelector('body');
body.appendChild(form);
const key = '88GTR4YP9S7U2QHX337V2YRPE';
const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${key}`;
async function getWeather() {
  try {
    const response = await fetch(url, {
      mod: 'CORS'
    });
    if (!response.ok) {
      console.error('Error with response');
    }
    const weatherData = await response.json();
    console.log(weatherData);
  } catch (error) {
    console.error('Cought an error');
  }
}