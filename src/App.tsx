import React from 'react';
import{Routes,Route}from "react-router-dom";
import './App.css';
import Login from './Pages/login';
import Users from './Pages/users';
import Accounts from './Pages/accounts';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path="/users" element={<Users/>}/>
          <Route path='/accounts' element={<Accounts/>}/>
      </Routes>
    </div>
  );
}

export default App;
