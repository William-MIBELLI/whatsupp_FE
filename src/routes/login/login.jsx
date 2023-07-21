import FormContainer from "../../components/form-container/formContainer";
import AuthForm from "../../components/auth/auth-form/authForm";
import AuthInput from "../../components/auth/auth-input/authInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../utils/validation";
import Button from "../../components/button/button";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../store/user/user.selector";
import { loginUserAsync } from "../../store/user/user.action";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Footer } from "./login.style";
import { Link } from "react-router-dom";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
        mode: "all",
    });

    const { isLoading, error, loggedIn } = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmitHandler = (data) => {
        console.log(data);
        dispatch(loginUserAsync(data));
        console.log("currentUser : ", loggedIn);
    };

    useEffect(() => {
        if (loggedIn) {
            navigate("/");
        }
    }, [loggedIn]);

    return (
        <FormContainer>
            <AuthForm
                title={"Login"}
                description={"Get sign in and start chating !"}
                submitHandler={handleSubmit(onSubmitHandler)}
            >
                <AuthInput
                    register={register}
                    label={"Your email"}
                    name={"email"}
                    type={"email"}
                    errors={errors?.email?.message}
                />
                <AuthInput
                    register={register}
                    label={"Your password"}
                    name={"password"}
                    type={"password"}
                    errors={errors?.password?.message}
                />
                {error && <p>{error.toString()}</p>}
                <Button text={"Sign in"} isLoading={isLoading} />
                <Footer>
                    <p>Don't have account ? Create one</p>
                    <Link to={"/register"}>Register</Link>
                </Footer>
            </AuthForm>
        </FormContainer>
    );
};

export default Login;
