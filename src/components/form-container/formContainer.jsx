import { StyledFormWrapper, StyledFormContainer } from "./formContainer.style";

const FormContainer = ({ children }) => {
    return (
        <StyledFormWrapper>
            <StyledFormContainer>
                { children }
            </StyledFormContainer>
        </StyledFormWrapper>
    )
}

export default FormContainer