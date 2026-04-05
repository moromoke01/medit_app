import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom"

const ProtectedRoute = ({children, role}) => {
    const { user } = useSelector((state) => state.auth);   //grab logged-in user

    //if no user, redirect to login
    if(!user) return <Navigate to="/login" />;

    //if role is specified and user role doesn't match, redirect to login
    if(role && user.role !== role) return <Navigate to="/login" />;


    //otherwise, render the protected page 
    return children;
};

export default ProtectedRoute;