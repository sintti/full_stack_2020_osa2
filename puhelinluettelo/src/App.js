import React, { useState } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'


const App = () => {
    const [ persons, setPersons ] = useState([
        { name: 'Sintti Pinttinen', number: '0401201201', id: 1 },
        { name: 'Arto Hellas', number: '040-123456', id: 2 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 3 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 4 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 5 }
    ])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ newFilter, setNewFilter ] = useState('')
    const [ showAll, setShowAll ] = useState('')
    
    // Changelistener for name
    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
    
    // Changelistener for phonenumber
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
        
    }
    
    // Changelistener for filter value
    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
    }
    
    // Filter show information based on filter value
    const personsToShow = showAll
        ? persons
        : persons.filter(person => person.name.toLowerCase().includes(newFilter))
    
    // Add person to phonebook
    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            number: newNumber,
            id: persons.length + 1
        }
        
        // Check if phonebook already contains same person
        function containsObject(obj, list) {
            return list.some(elem => elem.name === obj.name)
        }
        if (containsObject(personObject, persons) === false) {
            setPersons(persons.concat(personObject))
        } else if (containsObject(personObject, persons) === true) {
            alert(personObject.name + ' is already in phonebook')
        }
        
        setNewName('')
        setNewNumber('')
    }
    
    return (
        <div>
            <h2>Phonebook</h2>
            <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
            <PersonForm newName={newName} newNumber={newNumber} 
                handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}
                addPerson={addPerson} />
            <h2>Numbers</h2>
            <Persons personsToShow={personsToShow} />
        </div>
    )
    
}

export default App