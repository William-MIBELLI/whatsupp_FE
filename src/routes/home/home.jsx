import { useSelector } from "react-redux"
import { Container, StyledHome } from "./home.style"
import { selectCurrentUser } from "../../store/user/user.selector"
import { Link } from "react-router-dom"
import Sidebar from "../../components/sidebar/sidebar"
import { selectChat } from "../../store/chat/chat.selector"
import HomeDefault from "../../components/home-default/homeDefault"

const Home = () => {

    const user = useSelector(selectCurrentUser)
    const { activeConversation } = useSelector(selectChat)
    
    console.log(activeConversation)

    return (
        <StyledHome>
            <Container>
                <Sidebar />
                {
                    activeConversation ? 'activeConversation' : <HomeDefault/>
                }
            </Container>
        </StyledHome>
    )
}

export default Home