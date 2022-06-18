import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({country, showDetails, setShowDetails, setPresdCountry}) => {
  console.log(Object.values(country.languages))
  
  if(showDetails){
    return (
      <div>
        <h1>{country.name.common}</h1>
        <div>capital {country.capital}</div>
        <div>area {country.area}</div>
        <h2>languages: </h2>
        <ul>
        {Object.values(country.languages).map(lang=>(
          <li key={lang}>{lang}</li>))}
        </ul>
        <img src={country.flags.svg} alt={country.name.common} width="150px" />
        <Weather capital={country.capital} />
      </div>
    )
  }
  return (
    <div>
      {country.name.common}
      <button onClick={() => {
        return(
          setShowDetails(true),
          setPresdCountry([country])
        )
      }
     
      
      }>
        show
      </button>
    </div>
  )
}

  const getWeather = async capital => {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=52d2e4b33857365d9d78fdc03995a945`);
    return response.data;
  };

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState();
  getWeather(capital).then(weather => setWeather(weather));

  if (weather === undefined) {
  } else {
    const temperature = weather.main.temp-273.15;
    const iconURL = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
    const windSpeed = weather.wind.speed;
    const windDirection = weather.wind.deg;
    return (
      <form>
        <b>temperature</b> {temperature}
        <br />
        <img src={iconURL} alt="Loading..." />
        <br />
        <b>wind </b> {windSpeed} <b> direction</b> {windDirection}
      </form>
    );
  }
};

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
  const [showDetails, setShowDetails] = useState(false)
  const [presdCountry, setPresdCountry] = useState([])

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
    let countriesLen = countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase())).length
    if(countriesLen<=10){
      setShowAll(true)
      setShowDetails(false)
      if(countriesLen===1){
        setShowDetails(true)
        setPresdCountry(countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
      }
    }
    else{
      setShowAll(false)
      setShowDetails(false)
    }
  }

  
  const countriesToShow = showAll
  ? (showDetails ? presdCountry
  : countries.filter(country => country.name.common.toLowerCase().includes(newFilter)))
  : []

console.log("countries", countriesToShow)
console.log("showAll", showAll)
console.log("showDetails", showDetails)
console.log("presd", presdCountry)

  return (
    <div>
      <Filter value={newFilter} onChange={handleFilterChange}/>
      {countriesToShow.length===0 ? (
      <div>Too many matches, specify another filter</div>)
      : countriesToShow.map(country =>
        <Country key={country.population} country={country} showDetails={showDetails} setShowDetails={setShowDetails}
        setPresdCountry={setPresdCountry}/>)}
      
    </div>

  )

}

export default App