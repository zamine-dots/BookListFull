import React, { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
function Register() {
  const {user,registerUser}=useAuth()
  const nav=useNavigate()
  const registerInfo=useRef()
  useEffect(()=>{
    if (user){
      nav('/')
    }
  },[user,nav])
  const HandleRegister=(e)=>{
    e.preventDefault()
    const name=registerInfo.current.name.value
    const surname=registerInfo.current.surname.value
    const email=registerInfo.current.email.value
    const password1=registerInfo.current.password1.value
    const password2=registerInfo.current.password2.value
    if (password1!=password2){
      alert("passwords not identical")
      return;
    }
    const userInfo={name,surname,email,password1}
    registerUser(userInfo)
  }
  return (<>
    <nav className="navbar navbar-light bg-light px-4 py-2">
        <a className="navbar-brand">BookList.</a>
        <form className="form-inline">
          <Link to="/login" className="btn btn-outline-dark">
            Login
          </Link>
        </form>
    </nav>
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="p-5 rounded-4 shadow-lg" style={{ minWidth: '400px', width: '100%', maxWidth: '400px' }}>
        <form ref={registerInfo} onSubmit={HandleRegister}>
          <div className="form-group mb-3">
            <label htmlFor="NameRegister">Name</label>
            <input
              name='name'
              type="text"
              className="form-control"
              id="NameRegister"
              aria-describedby="emailHelp"
              placeholder="Enter Name"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="SurnameRegister">Surname</label>
            <input
              name='surname'
              type="text"
              className="form-control"
              id="SurnameRegister"
              aria-describedby="emailHelp"
              placeholder="Enter Name"
            />
          </div>
          
          

          <div className="form-group mb-3">
            <label htmlFor="EmailRegister">Email address</label>
            <input
            name='email'
              type="email"
              className="form-control"
              id="EmailRegister"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>


          <div className="form-group mb-3">
            <label htmlFor="PasswordRegister">Password</label>
            <input
            name='password1'
              type="password"
              className="form-control"
              id="PasswordRegister"
              placeholder="Password"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="ConfermPassword">Confirm Password</label>
            <input
            name='password2'
              type="password"
              className="form-control"
              id="ConfermPassword"
              placeholder="Password"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </form>
      </div>
    </div>
  </>);
}

export default Register