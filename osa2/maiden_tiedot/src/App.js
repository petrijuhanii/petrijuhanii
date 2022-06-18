import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({country}) => {
  return (
    <div>
      {country.name.common}
    </div>
  )
}

const Filter = (props) => {
  return (
    <div>
      find countries <input value={props.value} onChange={props.onChange}/>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'notes')

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value.toLowerCase())
    if(countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase())).length<=10){
      setShowAll(true)
    }
    else{
      setShowAll(false)
    }
  }
  
  const countriesToShow = showAll
  ? countries.filter(country => country.name.common.toLowerCase().includes(newFilter))
  : []
    

  return (
    <div>
      <Filter value={newFilter} onChange={handleFilterChange}/>
      
      {countriesToShow.map(country =>
        <Country key={country.name} country={country}/>)}
    </div>
  )

}

export default App