import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createEmployee, getEmployeeById, updateEmployee } from '../Services/EmployeeService';

const CreateEmployeeComponent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const { id } = useParams();
    const navigator = useNavigate();

    useEffect(() => {
        if (id) {
            getEmployeeById(id)
                .then((response) => {
                    setFirstName(response.data.firstName);
                    setLastName(response.data.lastName);
                    setEmail(response.data.email);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [id]);

    function saveOrUpdateEmployee(e) {
        e.preventDefault();

        const employee = { firstName, lastName, email };

        if (id) {
            updateEmployee(id, employee)
                .then((response) => {
                    navigator('/employees');
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            createEmployee(employee)
                .then((response) => {
                    navigator('/employees');
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    function PageTitle() {
        return (
            <h2 className="text-center">
                {id ? "Update Employee" : "Add Employee"}
            </h2>
        );
    }

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="card shadow p-3">
                        {PageTitle()}
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">First Name:</label>
                                    <input
                                        type="text"
                                        placeholder="Enter First Name"
                                        name="firstName"
                                        value={firstName}
                                        className="form-control"
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Last Name:</label>
                                    <input
                                        type="text"
                                        placeholder="Enter Last Name"
                                        name="lastName"
                                        value={lastName}
                                        className="form-control"
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Email:</label>
                                    <input
                                        type="text"
                                        placeholder="Enter Email"
                                        name="email"
                                        value={email}
                                        className="form-control"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <button className="btn btn-success w-100" onClick={saveOrUpdateEmployee}>
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateEmployeeComponent;
