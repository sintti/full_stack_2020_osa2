import React from 'react'

// Print form to submit information
const PersonForm = (props) => {
    return (
        <form>
            name: <input value={props.newName} onChange={props.handleNameChange} />
            number: <input value={props.newNumber} onChange={props.handleNumberChange} />
            <button type="submit" onClick={props.addPerson}>add</button>       
        </form>
    )
}

export default PersonForm