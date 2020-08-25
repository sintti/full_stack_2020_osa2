import React, { useState } from 'react'

const App = () => {
    const [ persons, setPersons ] = useState([
        { 
            name: 'Sintti Pinttinen',
            id: 1
        }
    ])
    const [ newName, setNewName ] = useState('')
    
    const Person = (props) => {
        return (
            <p>{props.person.name}</p>
        )
    }
    
    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }
    
    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            id: persons.length + 1
        }
        
        setPersons(persons.concat(personObject))
        setNewName('')
    }
    
    return (
        <div>
            <h2>Phonebook</h2>
            <form>
                <div>
                    name: <input 
                    value={newName}
                    onChange={handleNameChange} />
                </div>
                <div>
                    <button type="submit" onClick={addPerson}>add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <div>
                {persons.map(person =>
                    <Person key={person.id} person={person} />
                )}
            </div>
        </div>
    )
    
}

export default App