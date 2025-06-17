import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import PriviteRoutes from './utils/PriviteRoutes';
import Search from './components/Search';
import Favorite from './components/Favorite';
function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/search' element={<Search />} />
        <Route path='/favorite' element={<Favorite/>} />
        {/* Private routes */}
        <Route element={<PriviteRoutes />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App; // ✅ This must exist!
