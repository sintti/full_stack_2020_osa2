import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'


const App = () => {
    const [ persons, setPersons ] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ newFilter, setNewFilter ] = useState('')
    const [ showAll, setShowAll ] = useState()
    
    // Get data from db.json with axios
    useEffect(() => {
        console.log('effect')
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                console.log('promise fulfilled')
                setPersons(response.data)
            })
    }, [])
    
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