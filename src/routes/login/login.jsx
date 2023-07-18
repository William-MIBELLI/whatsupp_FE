import FormContainer from "../../components/form-container/formContainer";
import AuthForm from "../../components/auth/auth-form/authForm";
const Login = () => {
  return (
    <FormContainer>
      <AuthForm
        title={"Login"}
        description={"Please fill the required fields"}
      ></AuthForm>
    </FormContainer>
  );
};

export default Login;
