import React from 'react'
import Person from './Person'

// Print list of contacts with filtering possible
const Persons = ( {personsToShow} ) => {
    return (
        <div>
            {personsToShow.map(person =>
                <Person key={person.id} person={person} />
            )}
        </div>
)
}

export default Persons