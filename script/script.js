const apiKey = '9812bbeafe26b05f0d4fbc85d7838872'
const searchForm = document.querySelector('.search-form')
const cityInput = document.querySelector('.input-city')
const card = document.querySelector('.error')
const temperature = document.querySelector('.temp1')
const water = document.querySelector('.water')
const air = document.querySelector('.air')
const fa = document.querySelector('.box3')
const desc = document.querySelector('.desc')
const place = document.querySelector('.place')

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault()
  const city = cityInput.value

  if (city) {
    try {
      const weatherData = await getWeatherData(city)
      displayWeatherInfo(weatherData)
    } catch (error) {
      console.error(error)
      displayError(error)
    }
  } else {
    displayError('Please enter a city')
  }
})

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
  const response = await fetch(apiUrl)
  console.log(response)

  if (!response.ok) {
    throw new Error('Cold not fetch weather data')
  }

  return await response.json()
}

function displayWeatherInfo(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
    wind: { speed, deg },
  } = data

  const cityDisplay = document.createElement('h2')
  const tempDisplay = document.createElement('p')
  const humidityDisplay = document.createElement('p')
  const windDisplay = document.createElement('p')
  const descriptionDisplay = document.createElement('p')
  const weatherImgDisplay = document.createElement('img')

  temperature.textContent = ''
  place.textContent = ''
  water.textContent = ''
  air.textContent = ''
  desc.textContent = ''

  cityDisplay.textContent = city
  tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`
  humidityDisplay.textContent = `${humidity}%`
  windDisplay.textContent = `${speed.toFixed(1)}mph`
  descriptionDisplay.textContent = `${description}`

  humidityDisplay.classList.add('humidity')
  windDisplay.classList.add('wind-speed')
  descriptionDisplay.classList.add('weather-desc')

  place.appendChild(cityDisplay)
  temperature.appendChild(tempDisplay)
  water.appendChild(humidityDisplay)
  air.appendChild(windDisplay)
  desc.appendChild(descriptionDisplay)
}

function getWeatherPic(weatherId) {
  switch(true) {
    case (weatherId >= 200 && weatherId <300):
      return `../`
  }
}

function displayError(message) {
  const errorDisplay = document.createElement('p')
  errorDisplay.textContent = message
  errorDisplay.classList.add('errorDisplay')

  card.textContent = ''
  card.style.display = 'flex'
  card.appendChild(errorDisplay)
}
