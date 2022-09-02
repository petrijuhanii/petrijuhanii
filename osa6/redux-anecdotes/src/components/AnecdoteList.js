import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { voteNotification } from '../reducers/notificationReducer'
import { resetNotification } from '../reducers/notificationReducer'

const Anecdotes = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)

  const anecdotesInOrder = [...anecdotes]
  anecdotesInOrder.sort((a, b) => b.votes - a.votes)
  
  const anecdotesFiltered = anecdotesInOrder.filter(anecdote => 
    anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    console.log('vote', anecdote.id)
    dispatch(voteAnecdote(anecdote.id))
    dispatch(voteNotification(anecdote.content))
    setTimeout(() => {
      dispatch(resetNotification())
    }, 5000)
  }

  return (
    <div>
      {anecdotesFiltered.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Anecdotes