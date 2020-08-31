import React from 'react'

// Prints person's info
const Person = (props) => {
    return (
        <div>
            <span>
                {props.person.name}
                {props.person.number}
                <button onClick={props.handlePersonDelete}>Delete</button>
            </span>
        </div>
    )
}

export default Person