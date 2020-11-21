import React from 'react'

//name, id, parts[name, exercises, id]
const Course = ({ course }) => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

const Header = props => {
  return <h3>{props.name}</h3>
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part =>
        <Part
          key={part.id}
          name={part.name}
          exercises={part.exercises} />)}
    </div>
  )
}

const Part = props => {
  return (
    <div>
      <p>{props.name}, {props.exercises} exercises</p>
    </div>
  )
}

const Total = ({ parts }) => {
  return (
    <div>
      <p>
        Total number of exercises:
        {
          parts.reduce((totalExercises, part) => {
            return totalExercises += part.exercises
          }, 0)
        }
      </p>
    </div>
  )
}

export default Course
