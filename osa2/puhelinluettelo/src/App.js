import { useState, useEffect } from 'react'
import noteService from './services/notes'

const Person = ({person, deletePerson}) => {
  return (
    <div>
      {person.name} {person.number}
      <button onClick={deletePerson}> delete</button>
    </div>
  )
}

const Filter = (props) => {
  return (
    <div>
      filter shown with<input value={props.value} onChange={props.onChange}/>
    </div>
  )
}

const PersonForm = (props) => {
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: props.newName,
      number: props.newNumber
    }
    const found = props.persons.some(item => item.name === props.newName);
    if(found){
      alert(`${props.newName} is already added to phonebook`)
    }
    else{
      noteService
      .create(personObject)
      .then(returnedPerson => {
        props.setPersons(props.persons.concat(returnedPerson))
        props.setNewName('')
        props.setNewNumber('')
      })
    }
  }
  return (
    <form onSubmit={addPerson}>
        <div>
          name: <input value={props.newName} onChange={props.onChangeName}/>
        </div>
        <div>
          number: <input value={props.newNumber} onChange={props.onChangeNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'notes')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value.toLowerCase())
    if(newFilter===''){
      setShowAll(true)
    }
    else{
      setShowAll(false)
    }
  }

  const deletePerson = id => {
    if (window.confirm("Do you really want to delete?")) {
      noteService
      .deleteId(id)
        .then(deletedP => {
        setPersons(persons.map(person => person.id !== id ? person : deletedP))
      })
      window.location.reload()
    }
    
    
  }

  const personsToShow = showAll
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(newFilter))
    

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} onChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm newName={newName} onChangeName={handleNameChange}
      newNumber={newNumber} onChangeNumber={handleNumberChange}
      persons={persons} setPersons={setPersons} setNewName={setNewName}
      setNewNumber={setNewNumber}/>
      <h2>Numbers</h2>
      {personsToShow.map(person =>
        <Person key={person.name} person={person} deletePerson={() => deletePerson(person.id)}/>)}
    </div>
  )

}

export default App