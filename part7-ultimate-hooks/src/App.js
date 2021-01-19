//FullStack course task 7.8*, using a custom hook to fetch data
import React, { useState, useEffect } from 'react'
import axios from 'axios'

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

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  const getAll = () => {
    axios.get(baseUrl)
      .then(res => setResources(res.data))
      .catch(error => console.log(error))
  }

  const create = (resource) => {
    setResources([...resources, resource])
    axios.post(baseUrl, resource)
  }

  const service = {
    create,
    getAll
  }
  //referring to [notes, noteService], for example
  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  useEffect(() => {
    noteService.getAll()
    personService.getAll()
  }, [])

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
  }

  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value })
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      <div>
        {notes.map(n => <p key={n.id}>{n.content}</p>)}
      </div>
      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br />
        number <input {...number} />
        <button>create</button>
      </form>
      <div>
        {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
      </div>
    </div>
  )
}

export default App