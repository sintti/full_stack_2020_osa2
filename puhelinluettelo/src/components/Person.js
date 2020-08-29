import React from 'react'

// Prints person's info
const Person = (props) => {
    return (
        <div>
            <span>{props.person.name} {props.person.number}</span>
        </div>
    )
}

export default Person