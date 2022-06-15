const Course = (props) => {
    console.log(props)
    return(
      <div>
        <Header key={props.key} name={props.name}/>
        <Content parts={props.parts} />
        <Total parts={props.parts} />
      </div>
      
    )
  }

  const Header = ({name}) => {
    console.log(name)
    return (
      <div>
        <h2>{name}</h2>
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

  export default Course