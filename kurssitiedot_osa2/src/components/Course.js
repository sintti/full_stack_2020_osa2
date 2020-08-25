import React from 'react'

const Header = ({ coursename }) => {
    return (
      <h1>{coursename}</h1>
    )
  }
  
  const Part = ({ name, exercises}) => {
    return (
      <p>
        {name} {exercises}
      </p>
    )
  }
  
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map(part =>
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        )}
      </div>
    )
  }
  
  const Total = ({ parts }) => {
    const totalExercises = parts.reduce((sum, part) => {
      return sum + part.exercises
    }, 0)
    
   return (
    <p>Total number of exercises {totalExercises}</p>
   )
  }
  
  const Course = ({ course }) => {
    // console.log(course)
    return (
      <div>
        <Header coursename = {course.name}/>
        <Content parts = {course.parts}/>
        <Total parts = {course.parts} />
      </div>
    )
  }
  
  export default Course