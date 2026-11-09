import { Outlet,Navigate } from "react-router-dom";

import { useAuth } from "./auth-context";

function PriviteRoutes() {
    const {user}=useAuth()

  return (
    user? <Outlet />:<Navigate to="/login"/>
  )
}

export default PriviteRoutes
