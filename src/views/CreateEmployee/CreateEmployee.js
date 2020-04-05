import React, { useState } from 'react'
import './CreateEmployee.sass'
import config from '../../config'
import { getFromLocalStorage, isTokenEpired } from '../../token'

const CreateEmployee = (props) => {
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
    await isTokenEpired()
    
    const payload = JSON.stringify(employee)
    const data = await fetch(`${config.apiUrl}/employees/create`, {
      method: 'POST',
      headers: {
        'x-access-token': `${getFromLocalStorage('accessToken')}`,
        'Content-Type': 'application/json'
      },
      body: payload
    })
    const response = await data.json()
    if (response.message) {
      props.setNotificationData({
        isShow: true,
        value: response.message
      })

      setTimeout(() => {
        props.setNotificationData(state => {
          return {...state, isShow: false}
        })
      }, 5000)
    } else {
      props.setNotificationData({
        isShow: true,
        value: 'Employee was successfuly created'
      })

      setEmployee({
        name: '',
        position: '', 
        salary: '', 
        start_working_at: '', 
        work_days: '', 
        out_days: ''
      })

      setTimeout(() => {
        props.setNotificationData(state => {
          return {...state, isShow: false}
        })
      }, 5000)
    }
  } 

  return (
    <div className="create-employee-wrap">
      <h1>Create employee</h1>
      <form 
        className="create-employee-form" 
        onSubmit={createEmployee}
      >
        <div className="create-employee-item input-field col s6">
          <input onChange={setEmployeeData} value={employee.name} id="name" type="text" />
          <label htmlFor="name">Name</label>
        </div>
        <div className="create-employee-item input-field col s6">
          <input onChange={setEmployeeData} value={employee.position} id="position" type="text" />
          <label htmlFor="position">Position</label>
        </div>
        <div className="create-employee-item input-field col s6">
          <input onChange={setEmployeeData} value={employee.salary} id="salary" type="number" />
          <label htmlFor="salary">Salary</label>
        </div>
        <div className="create-employee-item input-field col s6">
          <input onChange={setEmployeeData} value={employee.start_working_at} id="start_working_at" type="date" />
          <label htmlFor="start_working_at">Start working at</label>
        </div>
        <div className="create-employee-item input-field col s6">
          <input onChange={setEmployeeData} value={employee.work_days} id="work_days" type="number" />
          <label htmlFor="work_days">Work days</label>
        </div>
        <div className="create-employee-item input-field col s6">
          <input onChange={setEmployeeData} value={employee.out_days} id="out_days" type="number" />
          <label htmlFor="out days">Out days</label>
        </div>
        <button 
          type="submit" 
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