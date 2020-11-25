import React, { useState, useEffect } from 'react'
import axios from 'axios'

//FullStack course 2020, tasks 2.6-2.12, Henrik Tarnanen

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const effectHook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log(response)
        setPersons(response.data)
      })
  }

  useEffect(effectHook, [])

  const handleSubmit = event => {
    event.preventDefault()
    //persons.find loops through the persons testing if a name matches
    if (persons.find(person => person.name === newName)) {
      window.alert(`${newName} is already in the phonebook.`)
    }
    else {
      setPersons(persons.concat({ name: newName, number: newNumber }))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleFilterChange = event => {
    setFilter(event.target.value)
  }

  const handleNameChange = event => {
    setNewName(event.target.value)
  }

  const handleNumberChange = event => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add new people</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h3>Numbers</h3>
      <NumberList persons={persons} filter={filter.toLowerCase()} />
    </div>
  )

}

const PersonForm = props => {
  //console.log("Personform props: ", props)
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange} />
      </div>
      <div>
        number: <input value={props.newNumber} onChange={props.handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const FilterForm = ({ filter, handleFilterChange }) => {
  return (
    <div>
      Filter people by name: <input value={filter} onChange={handleFilterChange} />
    </div>
  )
}


const NumberList = ({ persons, filter }) => {
  //filters the persons by the filter criterion, then creates Person-components
  const temp = persons.filter(person => person.name.toLowerCase().includes(filter))
  return (
    <div>
      {temp.map(person =>
        <Person key={person.name} name={person.name} number={person.number} />
      )}
    </div>
  )
}

const Person = props => {
  return <div>Name: {props.name}, #{props.number}</div>
}

export default App