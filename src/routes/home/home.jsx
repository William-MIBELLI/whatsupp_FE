import { useSelector } from "react-redux"
import { Container, StyledHome } from "./home.style"
import { selectCurrentUser } from "../../store/user/user.selector"
import { Link } from "react-router-dom"
import Sidebar from "../../components/sidebar/sidebar"

const Home = () => {

    const user = useSelector(selectCurrentUser)
    console.log('user : ', user)

    return (
        <StyledHome>
            <Container>
                <Sidebar/>
            </Container>
        </StyledHome>
    )
}

export default Home