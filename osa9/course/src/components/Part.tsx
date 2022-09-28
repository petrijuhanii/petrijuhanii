import { CoursePart } from "../types"

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({course}: {course: CoursePart }) => {
  switch(course.type){
    case "normal":
      return(
        <p>
          <b>{course.name} {course.exerciseCount}</b>
          <div>
            <i>{course.description}</i>
          </div>
        </p>
      )
    case "groupProject":
      return(
        <p>
          <b>{course.name} {course.exerciseCount}</b>
          <div>project exercises {course.groupProjectCount}</div>
        </p>
      )
    case "submission":
      return(
        <p>
          <b>{course.name} {course.exerciseCount}</b>
          <div>
            <i>{course.description}</i>
          </div>
          <div>submit to {course.exerciseSubmissionLink}</div>
        </p>
      )
    case "special":
        return(
            <p>
              <b>{course.name} {course.exerciseCount}</b>
              <div>
                <i>{course.description}</i>
              </div>
              <div>required skils: 
                {course.requirements.map(function(req, index){
                    return <span key={index}>{(index ? ', ' : '')} {req}</span>
              }
              )}</div>
            </p>
          )
    default:
      return assertNever(course);
  }
}

export default Part