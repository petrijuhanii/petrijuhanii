import { useState, useEffect } from 'react'
import axios from 'axios'

const Person = ({person}) => {
  return (
    <div>
      <p>{person.name} {person.number}</p>
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
      props.setPersons(props.persons.concat(personObject))
      props.setNewName('')
      props.setNewNumber('')
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
  const [persons, setPersons] = useState([
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
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
        <Person key={person.name} person={person}/>)}
    </div>
  )

}

export default App