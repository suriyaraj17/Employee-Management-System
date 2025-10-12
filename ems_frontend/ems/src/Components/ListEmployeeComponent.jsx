import React, { useEffect, useState } from 'react'
import { deleteEmployee, listEmployees } from '../Services/EmployeeService'
import { useNavigate } from 'react-router-dom'

const ListEmployeeComponent = () => {
    const [employees, setEmployees] = useState([])
    const navigator = useNavigate();

    useEffect(() => {
        getAllEmployees();

    }, [])

    function getAllEmployees() {
        listEmployees().then((response) => {
            setEmployees(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function addNewEmployee() {
        navigator('/add-employee');
    }
    
    // 1. New function to navigate to the view/details page
    function viewEmployee(id) {
        navigator(`/view-employee/${id}`); // Assuming you have a route like /view-employee/1
    }

    function updateEmployee(id) {
        navigator(`/edit-employee/${id}`);
    }
    
    function removeEmployee(id) {
        console.log(id);
        deleteEmployee(id).then((response) => {
            getAllEmployees();
        }).catch(error => {
            console.error(error);
        });
    }

    return (
        <div className='container my-4'> 
            <h2 className='text-center mb-3'>List of Employees</h2>
            
            <div className="d-flex justify-content-end mb-3">
                <button className='btn btn-primary' onClick={addNewEmployee}>Add Employee</button>
            </div>
            
            <div className="table-responsive">
                <table className='table table-striped table-bordered table-hover'>
                    <thead>
                        <tr>
                            <th className='d-none d-md-table-cell'>Employee ID</th>
                            <th>Employee First Name</th>
                            <th>Employee Last Name</th>
                            <th>Employee Email ID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employees.map(employee =>
                                <tr key={employee.id}>
                                    <td className='d-none d-md-table-cell'>{employee.id}</td>
                                    <td>{employee.firstName}</td>
                                    <td>{employee.lastName}</td>
                                    <td>{employee.email}</td>
                                    <td>
                                        {/* Updated: Added the View button */}
                                        <div className="d-grid gap-2 d-sm-block">
                                            <button 
                                                className='btn btn-secondary btn-sm' // Use a different color like 'secondary'
                                                onClick={() => viewEmployee(employee.id)}
                                                style={{ marginRight: "5px" }} // Add a small margin to separate from next button
                                            >
                                                View
                                            </button>
                                            <button 
                                                className='btn btn-info btn-sm mt-2 mt-sm-0' 
                                                onClick={() => updateEmployee(employee.id)}
                                            >
                                                Update
                                            </button>
                                            <button 
                                                className='btn btn-danger btn-sm ms-sm-2 mt-2 mt-sm-0'
                                                onClick={() => removeEmployee(employee.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListEmployeeComponent