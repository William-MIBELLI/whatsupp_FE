import { StyledForm } from "./form.style";

const Form = ({ children, submitHandler }) => {
    return (
        <StyledForm onSubmit={submitHandler} encType="multipart/form-data">
            { children }
        </StyledForm>
    )
}

export default Form