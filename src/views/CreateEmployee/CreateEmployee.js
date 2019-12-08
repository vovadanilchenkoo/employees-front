import React, { useState } from 'react'
import './CreateEmployee.sass'
import { config } from '../../config'

const CreateEmployee = () => {
    const [employee, setEmployee] = useState({
        name: '',
        position: '', 
        salary: '', 
        start_working_at: '', 
        work_days: '', 
        out_days: ''
    })

    const setEmployeeData = (e) => {
        e.persist()
        const property = e.target.id
        setEmployee((state) => {
            return {
                ...state,
                [property]: e.target.value
            }
        })
    }

    const createEmployee = async (e) => {
        e.preventDefault()

        const payload = JSON.stringify(employee)
        const data = await fetch(`${config.apiUrl}/create-employee`, {
            method: 'POST',
            headers: {
                'x-access-token': `${window.localStorage.getItem('accessToken')}`,
                'Content-Type': 'application/json'
            },
            body: payload
        })
        const response = await data.json()
        console.log(response)
    } 

    return (
        <div className="create-employee-wrap">
            <h1>Create employee</h1>
            <form className="create-employee-form">
                <div className="create-employee-item input-field col s6">
                    <input onChange={setEmployeeData} id="name" type="text" />
                    <label htmlFor="name">Name</label>
                </div>
                <div className="create-employee-item input-field col s6">
                    <input onChange={setEmployeeData} id="position" type="text" />
                    <label htmlFor="position">Position</label>
                </div>
                <div className="create-employee-item input-field col s6">
                    <input onChange={setEmployeeData} id="salary" type="number" />
                    <label htmlFor="salary">Salary</label>
                </div>
                <div className="create-employee-item input-field col s6">
                    <input onChange={setEmployeeData} id="start_working_at" type="date" />
                    <label htmlFor="start_working_at">Start working at</label>
                </div>
                <div className="create-employee-item input-field col s6">
                    <input onChange={setEmployeeData} id="work_days" type="number" />
                    <label htmlFor="work_days">Work days</label>
                </div>
                <div className="create-employee-item input-field col s6">
                    <input onChange={setEmployeeData} id="out_days" type="text" />
                    <label htmlFor="out days">Out days</label>
                </div>
                <button 
                    type="submit"
                    onClick={createEmployee} 
                    className="btn waves-effect waves-light" 
                >
                    Submit
                    <i className="material-icons right">send</i>
                </button>
            </form>
        </div>
    )
}

export default CreateEmployee