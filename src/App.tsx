import React, { useState } from 'react';
import{Routes,Route}from "react-router-dom";
import './App.css';
import Login from './Pages/login';
import Users from './Pages/users';
import Accounts from './Pages/accounts';

function App() {
  let [token,setToken]=useState<string>("");
  return (
    <div className="App">
      <Routes>
          <Route path='/' element={<Login setToken={setToken}/>}/>
          <Route path='/login' element={<Login setToken={setToken}/>}/>
          <Route path="/users" element={<Users token={token}/>}/>
          <Route path='/accounts' element={<Accounts token={token}/>}/>
      </Routes>
    </div>
  );
}

export default App;
