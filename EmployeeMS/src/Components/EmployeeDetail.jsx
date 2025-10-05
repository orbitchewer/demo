import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


const EmployeeDetail = () => {
    // Initializing with an empty object is better for dot notation access (employee.name)
    const [employee, setEmployee] = useState({}) 
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        // FIXED: Using backticks for template literal
        axios.get(`${import.meta.env.VITE_API_URL}/employee/detail/`+id)
        .then(result => {
            // Backend sends data as a direct array (not {Status: true, Result: [...]})
            // This is correct: get the first object from the array
            setEmployee(result.data[0]) 
        })
        .catch(err => console.log(err))
    }, [])


    const handleLogout = () => {
        // FIXED: Using backticks for template literal
        axios.get(`${import.meta.env.VITE_API_URL}/employee/logout`)
        .then(result => {
          if(result.data.Status) {
            localStorage.setItem("valid", true)
            navigate('/')
          }
        }).catch(err => console.log(err))
      }
    return (
      <div>
          <div className="p-2 d-flex justify-content-center shadow">
              <h4>Emoployee Management System</h4>
          </div>
          <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
              {/* Conditional rendering: Only try to show details if employee.name exists (data fetched) */}
              {employee.name ? (
                <>
                    <img src={`${import.meta.env.VITE_API_URL}/Images/`+employee.image} className='emp_det_image'/>
                    <div className='d-flex align-items-center flex-column mt-5'>
                        <h3>Name: {employee.name}</h3>
                        <h3>Email: {employee.email}</h3>
                        <h3>Salary: ${employee.salary}</h3>
                    </div>
                    <div>
                        <button className='btn btn-primary me-2'>Edit</button>
                        <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
                    </div>
                </>
              ) : (
                <h3>Loading Employee Details...</h3>
              )}
          </div>
      </div>
    )
  }
  
  export default EmployeeDetail