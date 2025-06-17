import React, { use } from 'react'
import { Link ,useNavigate} from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import '../styles/home.css';
function Home() {
  const {logoutUser}=useAuth()
  const navigate = useNavigate();
  return (<>
      <nav className="navbar navbar-light bg-light px-4 py-2">
        <a className="navbar-brand">BookList.</a>
        <form className="form-inline">
          <Link to="/login" onClick={()=>{logoutUser()}} className="btn btn-outline-dark">
            Logout
          </Link>
          <Link to="/favorite"className="btn btn-outline-dark">Favorite</Link>
        </form>
      </nav>
      <div className="home-container">
      <h1 className="title-gloss">
        BookList<span className="blinking-dot">.</span>
      </h1>
      <button 
        className="btn btn-glow btn-xl mt-4"
        onClick={() => navigate('/search')}
      >
        Search
      </button>
    </div></>
  )
}

export default Home