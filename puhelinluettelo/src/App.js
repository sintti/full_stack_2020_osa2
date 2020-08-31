import React, { useState, useEffect } from 'react'
import services from './services/services'
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
        services
            .getAll()
            .then(initialData => {setPersons(initialData)})
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
    
    const handlePersonDelete = id => {
        const url = `http://localhost:3001/persons/${id}`
        const person = persons.find(p => p.id === id)
        const result = window.confirm(`Delete ${person.name}`)
        if (result === true) {
                services
                    .deletePerson(url)
                    .then(() => {
                        // onDelete(id)
                        setPersons(persons.filter(p => p.id !== id))
                    })
        }
    }
    
    // Kokeilin rakentaa funktion, jolla saisin muokattua tietokannan ID:t poiston jälkeen
    // const onDelete = id => {
    //     const afterDelete = persons.filter(p => p.id > id)
    //     afterDelete.forEach(p => p.id -= 1)
    //     afterDelete.forEach(p => services
    //                                 .update(p.id, p)
    //                                 .then(resData => {
    //                                     setPersons(persons.concat(resData))
    //                                 }))
    // }
    
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
        // and add new person if not
        function containsObject(obj, list) {
            return list.some(elem => elem.name === obj.name)
        }
        if (containsObject(personObject, persons) === false) {
            services
                .create(personObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                })
        } else if (containsObject(personObject, persons) === true) {
            const changeNumber = window.confirm(`${personObject.name} is already added. Replace number?`)
            if (changeNumber === true) {
                const person = persons.find(p => p.name === personObject.name)
                services
                    .update(person.id, personObject)
                    .then(resData => {setPersons(persons.concat(resData))})
            }
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
            <Persons personsToShow={personsToShow} handlePersonDelete={handlePersonDelete} />
        </div>
    )
    
}

export default App