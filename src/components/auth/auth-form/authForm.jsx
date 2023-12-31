import {  Container, Description, Header, Title, Wrapper } from './authForm.style'
import Form from '../../form/form'

const AuthForm = ({ title, description, children, submitHandler, className }) => {
    return (
        <Wrapper className={className}  >
            <Container >
                <Header>
                    <Title>{title}</Title>
                    <Description>{description}</Description>
                </Header>
                <Form submitHandler={submitHandler} >
                    { children }
                </Form>
            </Container>
        </Wrapper>
    )
}

export default AuthForm