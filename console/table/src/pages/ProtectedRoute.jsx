import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const user = localStorage.getItem("user");
     return user ? <Outlet/> : <Navigate to="/login" />
}

export default ProtectedRoute;