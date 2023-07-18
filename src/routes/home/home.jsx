import { useSelector } from "react-redux"
import { Container } from "./home.style"
import { selectCurrentUser } from "../../store/user/user.selector"
import { Link } from "react-router-dom"

const Home = () => {

    const user = useSelector(selectCurrentUser)
    console.log('user : ', user)

    return (
        <Container>
            HOME
            <Link to={'/login'}>LOGIN</Link>
        </Container>
    )
}

export default Home