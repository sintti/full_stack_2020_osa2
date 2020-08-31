import React, { useState, useEffect } from 'react'
import './index.css'
import services from './services/services'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import Notification from './components/Notification'


const App = () => {
    const [ persons, setPersons ] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ newFilter, setNewFilter ] = useState('')
    const [ showAll, setShowAll ] = useState()
    const [ errorMessage, setErrorMessage ] = useState('Here comes error!')
    
    // Get data from db.json with axios
    useEffect(() => {
        services
            .getAll()
            .then(initialData => {
                setPersons(initialData)
                setErrorMessage(
                    `Loaded information from server successfully.`
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
            })
            .catch(() => {
                setErrorMessage(
                    `Could not load data from server.`
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
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
    
    const handlePersonDelete = id => {
        const person = persons.find(p => p.id === id)
        const result = window.confirm(`Delete ${person.name}`)
        if (result === true) {
                services
                    .deletePerson(id)
                    .then(() => {
                        setPersons(persons.filter(p => p.id !== id))
                        setErrorMessage(
                            `Deleted information successfully.`
                        )
                        setTimeout(() => {
                            setErrorMessage(null)
                        }, 5000)
                    })
                    .catch(() => {
                        setErrorMessage(
                            `Person '${person}' was already removed from server`
                        )
                        setTimeout(() => {
                            setErrorMessage(null)
                        }, 5000)
                    })
        }
    }
    
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
                .catch(() => {
                    setErrorMessage(
                        `Could not update server.`
                    )
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 5000)
                })
        } else if (containsObject(personObject, persons) === true) {
            const changeNumber = window.confirm(`${personObject.name} is already added. Replace number?`)
            if (changeNumber === true) {
                const change = persons.find(p => p.name === personObject.name)
                services
                    .update(change.id, personObject)
                    .then(resData => {
                        setPersons(persons.map(person => person.id !== change.id ? person : resData ))
                        setErrorMessage(
                            `Updated information successfully.`
                        )
                        setTimeout(() => {
                            setErrorMessage(null)
                        }, 5000)
                    })
                    .catch(() => {
                        setErrorMessage(
                            `Update was not successfull.`
                        )
                        setTimeout(() => {
                            setErrorMessage(null)
                        }, 5000)
                    })
            }
        }
        
        setNewName('')
        setNewNumber('')
    }
    
    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={errorMessage} />
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