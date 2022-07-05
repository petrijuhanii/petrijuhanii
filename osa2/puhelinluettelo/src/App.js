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
      if (window.confirm(`${props.newName} is already added to phonebook, replace the old number with a new one?`)){
        const person = props.persons.find(item => item.name === props.newName);
        const changedPerson = { ...person, number: props.newNumber }
        noteService
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            props.setPersons(props.persons.map(p => p.id !== person.id ? p : returnedPerson))
            props.setNewName('')
            props.setNewNumber('')
            props.setSuccesMessage(`${props.newName} number changed`)
              setTimeout(() => {
              props.setSuccesMessage(null)
              }, 2000)
          })
          .catch(error => {
            props.setErrorMessage(
              `Information of ${person.name} has already been removed from server`
            )
            setTimeout(() => {
              props.setErrorMessage(null)
            }, 2000)
            props.setPersons(props.persons.filter(n => n.id !== props.id))
          })
          }
          
      

    }
    else{
      noteService
      .create(personObject)
      .then(returnedPerson => {
        props.setPersons(props.persons.concat(returnedPerson))
        props.setNewName('')
        props.setNewNumber('')
        props.setSuccesMessage(`Added ${props.newName}`)
          setTimeout(() => {
            props.setSuccesMessage(null)
          }, 2000)
      })
      .catch(error=> {props.setErrorMessage(error.response.data.error)
        setTimeout(() => {
          props.setErrorMessage(null)
        }, 2000)})
        
      
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

const ErrorNotification = ({ errorMessage }) => {
  if (errorMessage === null) {
    return null
  }

  return (
    <div className="error">
      {errorMessage}
    </div>
  )
}

const SuccesNotification = ({ succesMessage }) => {
  if (succesMessage === null) {
    return null
  }

  return (
    <div className="succes">
      {succesMessage}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [succesMessage, setSuccesMessage] = useState(null)

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

  const deletePerson = (id, name) => {
    return () =>{
    if (window.confirm("Do you really want to delete?")) {
      noteService
      .deleteId(id)
        .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
      setSuccesMessage(`Deleted ${name}`)
          setTimeout(() => {
            setSuccesMessage(null)
          }, 2000)
    }    
  }
  }
  const personsToShow = showAll
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(newFilter))
    

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccesNotification succesMessage={succesMessage}/>
      <ErrorNotification errorMessage={errorMessage}/>
      <Filter value={newFilter} onChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm newName={newName} onChangeName={handleNameChange}
      newNumber={newNumber} onChangeNumber={handleNumberChange}
      persons={persons} setPersons={setPersons} setNewName={setNewName}
      setNewNumber={setNewNumber} setSuccesMessage={setSuccesMessage}
      setErrorMessage={setErrorMessage}/>
      <h2>Numbers</h2>
      {personsToShow.map(person =>
        <Person key={person.id} person={person} deletePerson={deletePerson(person.id, person.name)} />)}
    </div>
  )

}

export default App