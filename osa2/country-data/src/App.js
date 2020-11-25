import './App.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios'

//FullStack-course 2020, tasks. 2.12*-2.14*, Henrik Tarnanen

/** Note: because country data and weather data are from different API:s, there is a small amount of 
  special cases where the capital name does not match in them. This returns a 404 from the weather API. 
  */

const App = () => {
  //country data loaded on startup
  const [countries, setCountries] = useState([])
  //current state of the search bar (filter)
  const [currentSearch, setCurrentSearch] = useState('')
  //remembers the (non-weather) data of a single country, button of which was clicked
  const [selectedCountry, setSelectedCountry] = useState([])
  //remembers the weather of the selected country
  const [weather, setWeather] = useState([])
  //remembers the capital of the current country
  const [capital, setCapital] = useState('London')
  //2.14*: remembers whether only one country is rendered
  const [renderOneCountry, setRenderOneCountry] = useState(false)

  const weatherEffectHook = () => {
    console.log(capital, " data being loaded...")
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
      .then(res => {
        setWeather(res.data.main)
        setCapital(res.data.name)
        //console.log("New weather data:", res.data)
      })
  }


  useEffect(weatherEffectHook, [capital]) //run weather-effect hook when the capital changes

  const countryEffectHook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(res => {
        setCountries(res.data)
      })
  }
  useEffect(countryEffectHook, [])

  //2.14* on default, only change the value of the current search. If it matches only one country, start rendering that specific country.

  const handleSearch = event => {
    setCurrentSearch(event.target.value)
    if (createFilter(countries, event.target.value).length === 1) {
      const filteredCountries = createFilter(countries, event.target.value)
      setRenderOneCountry(true)
      setSelectedCountry(filteredCountries[0])
      //console.log("capital is now ", filteredCountries[0].capital)
      setCapital(filteredCountries[0].capital)
      //console.log('onecountry is now true')
    }
    else {
      //console.log('onecountry is now false')
      setRenderOneCountry(false)
    }
  }

  const createFilter = (countries, filter) => {
    const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
    return filteredCountries
  }

  const buttonHandler = country => {
    //console.log("onecountry is now true")
    setRenderOneCountry(true)
    setSelectedCountry(country)
    setCapital(country.capital)
  }


  return (
    <div>
      <div>
        find countries by name: <input value={currentSearch} onChange={handleSearch} />
      </div>
      <CountryList
        countries={countries}
        filter={currentSearch.toLowerCase()}
        buttonHandler={buttonHandler}
        selectedCountry={selectedCountry}
        weather={weather}
        renderOneCountry={renderOneCountry}
      />
    </div>
  );
}

const CountryList = ({ countries, filter, buttonHandler,
  selectedCountry, weather, renderOneCountry }) => {

  if (renderOneCountry) {
    return <SpecificCountry country={selectedCountry} weather={weather} />
  }
  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(filter))

  if (filteredCountries.length < 1) {
    return <div>No matches, refine search</div>
  }
  if (filteredCountries.length > 10) {
    return <p>Too many matches, refine search</p>
  }
  // if (filteredCountries.length === 1) {
  //   return <SpecificCountry country={filteredCountries[0]} weather={weather} />
  // }
  return (
    <div>
      {filteredCountries.map(country => {
        return <div key={country.name}>{country.name}<button onClick={() => buttonHandler(country)}>Show</button></div>
      })}
    </div>
  )
}

const SpecificCountry = ({ country, weather }) => {

  return (
    <>
      <h2>{country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h3>Languages</h3>

      <LanguageList languages={country.languages}></LanguageList>
      <CountryWeather weather={weather} capital={country.capital} />
      <h4>Flag of {country.name}:</h4>
      <img src={country.flag} alt="country's flag" />
    </>
  )
}


const CountryWeather = ({ weather, capital }) => {
  return (
    <div>
      <h3>Weather in {capital}: </h3>
      <div>
        Feels like: {weather.feels_like} degrees Celsius
        </div>
      <div>
        Actual temperature: {weather.temp} degrees Celsius
      </div>

    </div>
  )
}

const LanguageList = ({ languages }) => {
  return (
    <ul>
      {languages.map(language => {
        return <li key={language.name}>{language.name}</li>
      })}
    </ul>
  )
}

export default App;
