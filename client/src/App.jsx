
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import Routes and Route
import './App.css';
import Login from './Pages/Auth/Login'; // Your Login Component
import UserContext from './context/UserContext';
import Register from './Pages/Auth/Register';

function App() {
  return (
    <UserContext>
    <BrowserRouter>
      {/* Define Routes for routing */}
      <Routes>
        <Route index element={<Login />} /> 
        <Route path='/register' element={<Register />} /> {/* Use route path for Login */}

      </Routes>
    </BrowserRouter>
    </UserContext>
  );
}

export default App;
