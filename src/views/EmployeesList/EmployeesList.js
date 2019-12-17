import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { config } from '../../config'
import './EmployeesList.sass'
import Notification from '../../components/Notification/Notification'

const EmployeesList = () => {
  const [employees, setEmployees] = useState([])
  const [notificationData, setNotificationData] = useState({
    isShow: false,
    values: []
  })

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(`${config.apiUrl}/employees-list`, {
        headers: {
          'x-access-token': `${window.localStorage.getItem('accessToken')}`
        }
      })
      const response = await data.json()
      setEmployees(response.rows)
    }

    fetchData()
  }, [])

  const deleteEmployee = async (id) => {
    const request = await fetch(`${config.apiUrl}/employee/${id}`, {
      method: 'DELETE',
      headers: {
        'x-access-token': `${window.localStorage.getItem('accessToken')}`,
      }
    })
    
    // TODO: Add error handling
    // this request is repeated, put him to separate function
    const fetchEmployees = await fetch(`${config.apiUrl}/employees-list`, {
      headers: {
        'x-access-token': `${window.localStorage.getItem('accessToken')}`
      }
    })
    const response = await fetchEmployees.json()
    setEmployees(response.rows)

    if (request.status === 204) {
      setNotificationData({
        isShow: true,
        value: "Employee was successfuly deleted"
      })
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
    <div className="employees-list-wrap">
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

      <Notification show={notificationData.isShow} value={notificationData.value} />
    </div>
  )
}

export default EmployeesList