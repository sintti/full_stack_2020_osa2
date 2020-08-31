import React from 'react'
import Person from './Person'

// Print list of contacts with filtering possible
const Persons = (props) => {
    return (
        <div>
            {props.personsToShow.map(person =>
                <Person key={person.id} person={person} handlePersonDelete={() => props.handlePersonDelete(person.id)} />
            )}
        </div>
)
}

export default Persons