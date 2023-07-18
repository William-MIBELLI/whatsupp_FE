import { useSelector } from "react-redux"
import { Container } from "./home.style"
import { selectCurrentUser } from "../../store/user/user.selector"

const Home = () => {

    const user = useSelector(selectCurrentUser)
    console.log('user : ', user)

    return (
        <Container>HOME</Container>
    )
}

export default Home