import { StyledForm } from "./form.style";

const Form = ({ children, submitHandler }) => {
    return (
        <StyledForm onSubmit={submitHandler}>
            { children }
        </StyledForm>
    )
}

export default Form