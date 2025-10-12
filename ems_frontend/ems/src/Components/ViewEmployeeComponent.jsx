import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getEmployeeById } from '../Services/EmployeeService' // You'll need this service function

const ViewEmployeeComponent = () => {
    // 1. Get the 'id' from the URL using useParams
    const { id } = useParams(); 
    const [employee, setEmployee] = useState({});
    
    useEffect(() => {
        // 2. Fetch the data for the specific employee
        getEmployeeById(id).then((response) => {
            setEmployee(response.data);
        }).catch(error => {
            console.error(error);
        });
    }, [id])

    return (
        <div className='container my-4'>
            <h2 className='text-center'>Employee Details</h2>
            <div className='card col-md-6 offset-md-3'>
                <div className='card-body'>
                    <p><strong>ID: </strong> {employee.id}</p>
                    <p><strong>First Name: </strong> {employee.firstName}</p>
                    <p><strong>Last Name: </strong> {employee.lastName}</p>
                    <p><strong>Email: </strong> {employee.email}</p>
                    {/* Add more details as needed */}
                </div>
            </div>
        </div>
    )
}

export default ViewEmployeeComponent