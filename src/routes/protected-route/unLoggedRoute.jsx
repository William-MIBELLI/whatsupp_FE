
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import { selectUser } from "../../store/user/user.selector"

const UnLoggedRoute = ({ user, redirection = '/' }) => {
    
    const { loggedIn } = useSelector(selectUser)
    
    if (loggedIn) {
       return <Navigate to={redirection} replace/>
    }

    return <Outlet/>

}

export default UnLoggedRoute