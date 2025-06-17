import { Outlet,Navigate } from "react-router-dom";

import React from 'react'
import { useAuth } from "./AuthContext";

function PriviteRoutes() {
    const {user}=useAuth()

  return (
    user? <Outlet />:<Navigate to="/login"/>
  )
}

export default PriviteRoutes