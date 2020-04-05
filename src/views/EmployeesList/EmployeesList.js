import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import config from '../../config'
import { getFromLocalStorage, isTokenEpired } from '../../token'
import './EmployeesList.sass'

const EmployeesList = (props) => {
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    async function fetchData() {
      await isTokenEpired()
    
      const data = await fetch(`${config.apiUrl}/employees/list`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': `${getFromLocalStorage('accessToken')}`
        }
      })
      const response = await data.json()
      setEmployees(response.data || [])
    }

    fetchData()
  }, [])

  const deleteEmployee = async (id) => {
    await isTokenEpired()

    const request = await fetch(`${config.apiUrl}/employee/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `${getFromLocalStorage('accessToken')}`,
      }
    })
    
    // TODO: Add error handling
    // this request is repeated, put him to separate function
    const fetchEmployees = await fetch(`${config.apiUrl}/employees/list`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `${getFromLocalStorage('accessToken')}`
      }
    })
    const response = await fetchEmployees.json()
    setEmployees(response.data || [])

    if(response.message) {
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
        value: "Employee was successfuly deleted"
      })

      setTimeout(() => {
        props.setNotificationData(state => {
          return {...state, isShow: false}
        })
      }, 5000)
    }
  }

  const employeesList = employees.map(el => (
    <tr key={el.id}>
      <td>
        <Link to={`/employee/${el.id}`}>{el.name}</Link>
      </td>
      <td>{el.position}</td>
      <td>{el.salary}</td>
      <td>{el.start_working_at}</td>
      <td>{el.work_days}</td>
      <td>
        <span className="employees-table__content">
          {el.out_days}
        </span>
        <button
          type="button" 
          onClick={() => deleteEmployee(el.id)}
          className="employees-table__delete btn-floating btn-middle waves-effect waves-light"
        >
          <i className="material-icons">delete</i>
        </button>
      </td>
    </tr>
  ))

  return (
    <div className="employees/list-wrap">
      <h1 className="center-align">Employees list</h1>
      <table className="striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Salary</th>
            <th>Start working at</th>
            <th>Work days</th>
            <th>Out days</th>
          </tr>
        </thead>
        <tbody>
          {employeesList}
        </tbody>
      </table>
    </div>
  )
}

export default EmployeesList