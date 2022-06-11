import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({good, neutral, bad}) => {
  if((good + neutral + bad)===0){
    return(
      <div>
        <h1>statistics</h1>
        <div>No feedback given</div>
      </div>
    )
  }
  return(
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value ={good} />
          <StatisticLine text="neutral" value ={neutral} />
          <StatisticLine text="bad" value ={bad} />
          <StatisticLine text="all" value ={good + neutral + bad} />
          <StatisticLine text="average" value ={(good - bad)/(good + neutral + bad)} />
          <StatisticLine text="positive" value ={good/ (good + neutral + bad)*100} />
        </tbody>
      </table>  
    </div>
    
    
  )
}

const StatisticLine = ({text, value}) => {
  
  if(text==='average'){
    let round = (value).toFixed(1);
    return(
      <tr>
        <td>{text}</td>
        <td>{round}</td>
      </tr>
    )
  }
  if(text==='positive'){
    let round = (value).toFixed(1);
    return(
      <tr>
        <td>{text}</td>
        <td>{round} %</td>
      </tr>
    )
  }
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good'/> 
      <Button handleClick={handleNeutralClick} text='neutral'/> 
      <Button handleClick={handleBadClick} text='bad'/> 
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App

