import React, { useState, useEffect } from 'react'
import phonebook from './services/phonebook'
import './index.css'

//FullStack course 2020, tasks 2.6-2.12, 2.15-2.18, 2.19-2.20 Henrik Tarnanen

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [success, setSuccess] = useState(true)

  const effectHook = () => {
    phonebook.getAll().then(persons => setPersons(persons))
  }

  useEffect(effectHook, [])



  const handleFilterChange = event => {
    setFilter(event.target.value)
  }

  const handleNameChange = event => {
    setNewName(event.target.value)
  }

  const handleNumberChange = event => {
    setNewNumber(event.target.value)
  }

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
          setSuccess(true)
          setMessage(`Added ${newName} to the phonebook.`)
          setTimeout(() => {
            setMessage(null)

          }, 5000)
        })
        .catch(error => {
          //console.log(error.response.data.error)
          setMessage(error.response.data.error)
          setTimeout(() => {
            setMessage(null)

          }, 5000)
        })

      setNewName('')
      setNewNumber('')
    }
  }

  const handleDelete = (id, name) => {
    if (window.confirm("Are you sure you want to delete this information?")) {
      phonebook
        .deletePerson(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id))
          setSuccess(true)
          setMessage(`Deleted ${name} from the phonebook.`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setSuccess(false)
          setMessage(`${name} has been already deleted from the phonebook.`)
        })
    }

  }

  const Notification = ({ message, success }) => {
    if (message === null) {
      return null
    }
    if (success) {
      return (
        <div className="notification">
          {message}
        </div>)
    }
    return (
      <div className="errorNotification">
        {message}
      </div>
    )
  }

  //after a PUT-request, update the state, re-render and reset fields
  const handleUpdate = (id, person) => {
    phonebook
      .updatePerson(id, person)
      .then(res => {
        effectHook()
        setSuccess(true)
        setMessage(`Modified ${newName} in the phonebook.`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
      })
      //rejected promise handling
      .catch(error => {
        setSuccess(false)
        setMessage(`${newName} has been already deleted from the phonebook.`)
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} success={success} />
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
  return <div>Name: {props.name}, #{props.number} <button onClick={() => props.handleDelete(props.id, props.name)}>Delete</button></div>
}

export default App