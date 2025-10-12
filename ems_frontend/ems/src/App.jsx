import './App.css';
import CreateEmployeeComponent from './Components/CreateEmployeeComponent';
import HeaderComponent from './Components/HeaderComponent';
import ListEmployeeComponent from './Components/ListEmployeeComponent';
import ViewEmployeeComponent from './Components/ViewEmployeeComponent'; // 1. Import the new component
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <>
            <BrowserRouter>
                <HeaderComponent />
                <Routes>
                    {/* //http://localhost:3000 */}
                    <Route path="/" element={<ListEmployeeComponent />}></Route>
                    {/* //http://localhost:3000/employees */}
                    <Route path="/employees" element={<ListEmployeeComponent />}></Route>
                    {/* //http://localhost:3000/add-employees*/}
                    <Route path='/add-employee' element={<CreateEmployeeComponent />}></Route>
                    {/* //http://localhost:3000/edit-employees/:id*/}
                    <Route path='/edit-employee/:id' element={<CreateEmployeeComponent />}></Route>
                    {/* //http://localhost:3000/view-employee/:id */}
                    <Route path='/view-employee/:id' element={<ViewEmployeeComponent />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;