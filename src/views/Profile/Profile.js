import React, { useState, useEffect } from 'react'
import './Profile.sass'
import config from '../../config'
import { getFromLocalStorage, isTokenEpired } from '../../token'

const Profile = (props) => {
  const [profileData, setProfileData] = useState({
    name: '',
    position: '',
    salary: '',
    start_working_at: '',
    work_days: '',
    out_days: ''
  })

  useEffect(() => {
    const fetchData = async () => {
      await isTokenEpired()

      const userId = props.match.params.id
      const data = await fetch(`${config.apiUrl}/employee/${userId}`, {
        headers: {
          'x-access-token': `${getFromLocalStorage('accessToken')}`
        }
      })
      const response = await data.json()
      setProfileData(() => ({
        name: response.data.name,
        position: response.data.position,
        salary: response.data.salary,
        start_working_at: response.data.start_working_at,
        work_days: response.data.work_days,
        out_days: response.data.out_days
      }))
    }

    fetchData()
  }, [])

  const editField = (e) => {
    e.target.closest('.profile-data-list__item').querySelector('.profile-data-list__inner').classList.toggle('profile-data-list__inner_active')
  }
  const inputHandler = (e) => {
    e.persist()

    const property = e.target.id
    setProfileData((state => {
      return {
        ...state, 
        [property]: e.target.value
      }
    }))
  }
  const sendEmployeeData = async () => {
    await isTokenEpired()

    const userId = props.match.params.id
    const payload = JSON.stringify(profileData)
    const request = await fetch(`${config.apiUrl}/employee/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `${getFromLocalStorage('accessToken')}`,
      },
      body: payload
    })
    const response = await request.json()

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
        value: 'Employee was successfuly updated'
      })

      setTimeout(() => {
        props.setNotificationData(state => {
          return {...state, isShow: false}
        })
      }, 5000)
    }
  }

  return (
    <div className="profile">
      <ul className="profile-data-list collection">
        <li className="profile-data-list__item collection-item">
          <div className="profile-data-list__inner">
            <span className="profile-data-list__content">
              {profileData.name}
            </span>
            <div className="profile-input-field input-field col s6">
              <input
                id="name"
                type="text"
                placeholder=" "
                value={profileData.name}
                onChange={inputHandler}
                className="profile-data-list__input"
              />
              <label htmlFor="name">Name</label>
            </div>
          </div>
          <button 
            type="button"
            onClick={editField} 
            className="profile-data-list__edit btn-floating btn-middle waves-effect waves-light" 
          >
            <i className="material-icons">edit</i>
          </button>
        </li>
        <li className="profile-data-list__item collection-item">
          <div className="profile-data-list__inner">
            <span className="profile-data-list__content">
              {profileData.position}
            </span>
            <div className="profile-input-field input-field col s6">
              <input
                id="position"
                type="text"
                placeholder=""
                value={profileData.position}
                onChange={inputHandler}
                className="profile-data-list__input" 
              />
              <label htmlFor="position">Position</label>
            </div>
          </div>
          <button
            type="button"
            onClick={editField}
            className="profile-data-list__edit btn-floating btn-middle waves-effect waves-light" 
          >
            <i className="material-icons">edit</i>
          </button>
        </li>
        <li className="profile-data-list__item collection-item">
          <div className="profile-data-list__inner">
            <span className="profile-data-list__content">
              {profileData.salary}
            </span>
            <div className="profile-input-field input-field col s6">
              <input 
                id="salary" 
                type="text" 
                placeholder=""
                value={profileData.salary}
                onChange={inputHandler} 
                className="profile-data-list__input" 
              />
              <label htmlFor="salary">Salary</label>
            </div>
          </div>
          <button 
            type="button"
            onClick={editField} 
            className="profile-data-list__edit btn-floating btn-middle waves-effect waves-light" 
          >
            <i className="material-icons">edit</i>
          </button>
        </li>
        <li className="profile-data-list__item collection-item">
          <div className="profile-data-list__inner">
            <span className="profile-data-list__content">
              {profileData.start_working_at}
            </span>
            <div className="profile-input-field input-field col s6">
              <input 
                id="start_working_at" 
                type="text" 
                placeholder=""
                value={profileData.start_working_at}
                onChange={inputHandler} 
                className="profile-data-list__input" 
              />
              <label htmlFor="start_working_at">Start working at</label>
            </div>
          </div>
          <button 
            type="button"
            onClick={editField} 
            className="profile-data-list__edit btn-floating btn-middle waves-effect waves-light" 
          >
            <i className="material-icons">edit</i>
          </button>
        </li>
        <li className="profile-data-list__item collection-item">
          <div className="profile-data-list__inner">
            <span className="profile-data-list__content">
              {profileData.work_days}
            </span>
            <div className="profile-input-field input-field col s6">
              <input 
                id="work_days" 
                type="text" 
                placeholder=""
                value={profileData.work_days}
                onChange={inputHandler} 
                className="profile-data-list__input" 
              />
              <label htmlFor="work_days">Work days</label>
            </div>
          </div>
          <button 
            type="button"
            onClick={editField} 
            className="profile-data-list__edit btn-floating btn-middle waves-effect waves-light" 
          >
            <i className="material-icons">edit</i>
          </button>
        </li>
        <li className="profile-data-list__item collection-item">
          <div className="profile-data-list__inner">
            <span className="profile-data-list__content">
              {profileData.out_days}
            </span>
            <div className="profile-input-field input-field col s6">
              <input 
                id="out_days" 
                type="text" 
                placeholder=""
                value={profileData.out_days}
                onChange={inputHandler} 
                className="profile-data-list__input" 
              />
              <label htmlFor="out_days">Out days</label>
            </div>
          </div>
          <button 
            type="button"
            onClick={editField} 
            className="profile-data-list__edit btn-floating btn-middle waves-effect waves-light" 
          >
            <i className="material-icons">edit</i>
          </button>
        </li>
      </ul>
      <button 
        type="button" 
        onClick={sendEmployeeData}
        className="profile__send-btn btn waves-effect waves-light" 
      >
        Submit
        <i className="material-icons right">send</i>
      </button>
    </div>
  )
}

export default Profile
