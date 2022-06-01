import React from 'react'
import './App.css';
import {Get_User} from './Redux/Actions'
import { useSelector,useDispatch } from 'react-redux';
import {Routes, Route, Outlet} from 'react-router-dom';
import NotFound from './Components/NotFound.js';
import Home from './Components/Home';
import Checkouts from './Components/Checkouts.js';
import Index from './Components/Index.js'
import Login from './Components/Login.js';
import Signup from './Components/Signup.js';
import Address from './Components/Address.js';
import Payment from './Components/Payment';
import Orders from './Components/Orders'


const PrivateRoute = () =>{
  const dispatch = useDispatch()
  const getUser = useSelector((state) => state.user.userLogin)

  window.onbeforeunload = function(){
    localStorage.setItem('lg',JSON.stringify(getUser))

  }

  window.onload = function(){
    JSON.parse(localStorage.getItem('lg')) && dispatch(Get_User())
    localStorage.clear()
  }
  return (
      getUser ? <Outlet/> : <NotFound/>
  )
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Index/>}>
          <Route path='' element={<Home/>}/>
          <Route path='Orders' element={<Orders/>} />
          <Route path='Checkout' element={<Checkouts/>}/>
        </Route>
        <Route path='/Login' element={<Login/>} />
        <Route path='/Signup' element={<Signup/>} />
        <Route element={<PrivateRoute/>}>
          <Route path='/addressselect' element={<Address/>} />
          <Route path='/payment' element={<Payment/>} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
