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
import { useContext, useEffect } from "react";
import {
    Footer,
    ForgetPassDiv,
    ForgetPassText,
    Description,
    SwitchIcon,
    SwitchContainer,
} from "./login.style";
import { Link } from "react-router-dom";
import PrimaryText from "../../components/primary-text/primaryText";
import Switch from "react-switch";
import { SelectThemeContext } from "../../App";
import { ThemeContext } from "styled-components";

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
    const { theme, setTheme } = useContext(SelectThemeContext);
    const color = useContext(ThemeContext)

    const onSubmitHandler = async (data) => {
        const r = await dispatch(loginUserAsync(data));
        if (r) {
            navigate("/home");
        }
    };

    //On redirige vers Home si l'user est deja loggué
    useEffect(() => {
        if (loggedIn) {
            navigate("/home");
        }
    }, [loggedIn]);

    return (
        <FormContainer>
            <AuthForm
                title={"Login"}
                description={"Get sign in and start chatting !"}
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
                <ForgetPassDiv>
                    <Link to="/forget-password">
                        <ForgetPassText>Forget your password ?</ForgetPassText>
                    </Link>
                </ForgetPassDiv>
                <Button text={"Sign in"} loading={isLoading} />
                <Footer>
                    <Description>Don't have account ? Create one</Description>
                    <Link to={"/register"}>
                        <PrimaryText>Register</PrimaryText>
                    </Link>
                </Footer>
                <SwitchContainer>
                    <Switch
                        onChange={(checked) => setTheme(checked)}
                        checked={theme}
                        width={53}
                        height={25}
                        checkedIcon={<SwitchIcon>😎</SwitchIcon>}
                        uncheckedIcon={<SwitchIcon>🌚</SwitchIcon>}
                        onColor={color.green_1}
                    />
                </SwitchContainer>
            </AuthForm>
        </FormContainer>
    );
};

export default Login;
