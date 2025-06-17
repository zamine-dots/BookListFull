import React, { useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure Bootstrap is 
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
function Login() {
  const {user,loginUser}=useAuth()
  const nav=useNavigate()
  const loginForm=useRef(null)

  useEffect(()=>{
    if (user){
      nav('/') 
    }
  },[user,nav])
  const HandleSubmit=(e)=>{
    e.preventDefault()
    const email=loginForm.current.email.value
    const password=loginForm.current.password.value
    const userInfo={email,password}
    loginUser(userInfo)
  }

  return (
    <>    <nav className="navbar navbar-light bg-light px-4 py-2">
            <a className="navbar-brand">BookList.</a>
            <form className="form-inline">
            </form>
          </nav>
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="p-5 rounded-4 shadow-lg" style={{ minWidth: '400px', width: '100%', maxWidth: '400px' }}>
        <form ref={loginForm} onSubmit={HandleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              name='email'
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              name='password'
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
          <a href="/register">Register</a>
        </form>
      </div>
    </div>
  </>);
}

export default Login;
