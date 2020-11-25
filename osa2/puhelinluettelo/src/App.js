import React, { useState, useEffect } from 'react'
import phonebook from './services/phonebook'

//FullStack course 2020, tasks 2.6-2.12, 2.15-2.18 Henrik Tarnanen


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const effectHook = () => {
    phonebook.getAll().then(persons => setPersons(persons))
  }

  useEffect(effectHook, [])

  const handleSubmit = event => {
    event.preventDefault()
    //persons.find loops through the persons testing if a name matches
    if (persons.find(person => person.name === newName)) {
      if (window.confirm(`Are you sure you want to update the information of ${newName}?`)) {
        //updatedPerson is for finding the ID to update the correct information
        const updatedPerson = persons.find(person => person.name === newName)
        handleUpdate(updatedPerson.id, { name: newName, number: newNumber })

      }

    }
    else {
      phonebook
        .addPerson({ name: newName, number: newNumber })
        .then(response => {
          setPersons(persons.concat(response))

        })

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

  const handleDelete = id => {
    if (window.confirm("Are you sure you want to delete this information?")) {
      phonebook
        .deletePerson(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }

  }

  const handleUpdate = (id, person) => {
    phonebook
      .updatePerson(id, person)
      .then(res => {
        effectHook()
        setNewName('')
        setNewNumber('')
      })
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
      <NumberList persons={persons} filter={filter.toLowerCase()} handleDelete={handleDelete} />
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


const NumberList = ({ persons, filter, handleDelete }) => {
  //filters the persons by the filter criterion, then creates Person-components
  const temp = persons.filter(person => person.name.toLowerCase().includes(filter))
  return (
    <div>
      {temp.map(person =>
        <Person
          key={person.id}
          id={person.id}
          name={person.name}
          number={person.number}
          handleDelete={handleDelete} />
      )}
    </div>
  )
}

const Person = props => {
  return <div>Name: {props.name}, #{props.number} <button onClick={() => props.handleDelete(props.id)}>Delete</button></div>
}

export default App