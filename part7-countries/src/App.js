import React, { useState, useEffect } from 'react'
import axios from 'axios'

//fullstack course task 7.7*. Modified the template to display correct data, since paths didn't match what was returned from the API.

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const getCountry = async (url) => {
  const response = await axios.get(url).catch(error => {
    console.log(error)
    return null
  })
  return response
}

//only run the hook if either the name or the URL changes (practically they change simultaneously)
const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const url = `https://restcountries.eu/rest/v2/name/${name}?fullText=true`
  useEffect(() => {
    getCountry(url).then(country => {
      setCountry(country)
    })
  }, [name, url])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data[0].name} </h3>
      <div>capital {country.data[0].capital} </div>
      <div>population {country.data[0].population}</div>
      <img src={country.data[0].flag} height='100' alt={`flag of ${country.data[0].name}`} />
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('finland')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App