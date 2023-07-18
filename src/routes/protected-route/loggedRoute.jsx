import { useSelector } from "react-redux"
import { selectUser } from "../../store/user/user.selector"
import { Navigate, Outlet } from "react-router-dom"

const LoggedRoute = ({ redirection = '/login' }) => {
    
    const { loggedIn } = useSelector(selectUser)

    if (!loggedIn) {
        return <Navigate to={redirection} replace/>
    }

    return <Outlet/>
}

export default LoggedRoute