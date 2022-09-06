import { connect } from 'react-redux'
import { filterAnecdotes } from '../reducers/filterReducer'

const Filter = (props) => {
  console.log(filterAnecdotes)
  console.log(props.filterAnecdotes)
  const handleChange = (event) => {
    event.preventDefault()
    const content = event.target.value
    props.filterAnecdotes(content)
  }
  
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
    filterAnecdotes
}
  

export default connect(null, mapDispatchToProps)(Filter)