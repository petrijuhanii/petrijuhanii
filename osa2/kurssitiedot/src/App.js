const Header = ({name}) => {
  console.log(name)
  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      {props.parts.map(part =>
        <Part key={part.id} part={part}/>)}
    </div>
  )
}

const Total = (props) => {
  console.log(props)
  const initialValue = 0;
  let total = props.parts.reduce( function(s, p) {
    return s + +p.exercises;}, initialValue)
  return (
    <div>
      <p style={{fontWeight: "bold"}}>total of {total} exercises</p>
    </div>
  )
}

const Part = ({part}) => {
  console.log(part)
  return (
    <div>
      <p>{part.name} {part.exercises}</p>
    </div>
  )
}

const Course = (props) => {
  console.log(props)
  return(
    <div>
      <Header key={props.course.id} name={props.course.name}/>
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </div>
    
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: ' React',
        exercises: 11,
        id: 4
      },
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App