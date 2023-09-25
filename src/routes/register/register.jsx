import FormContainer from "../../components/form-container/formContainer";
import AuthInput from "../../components/auth/auth-input/authInput";
import AuthForm from "../../components/auth/auth-form/authForm";
import { registerSchema } from "../../utils/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Button from "../../components/button/button";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../store/user/user.selector";
import { Link, useNavigate } from "react-router-dom";
import { Footer } from "./register.style";
import { fetchUserAsync } from "../../store/user/user.action";
import Picture from "../../components/auth/picture/picture";
import { useEffect, useState } from "react";

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(registerSchema),
        mode: "all",
    });
    
    const [picture, setPicture] = useState()
    const { isLoading, error, loggedIn } = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const onSubmitHandler = async (data) => {
        dispatch(fetchUserAsync({ ...data, picture }));
    };

    //On redirige si l'user est deja logué
    useEffect(() => {
        if (loggedIn) {
            navigate('/')
        }
    }, [loggedIn])

    return (
        <FormContainer>
            <AuthForm
                title={"Register"}
                description={"Create your account"}
                submitHandler={handleSubmit(onSubmitHandler)}
            >
                <AuthInput
                    label={"Your name"}
                    type={"text"}
                    name={"name"}
                    register={register}
                    errors={errors?.name?.message}
                />
                <AuthInput
                    label={"Your email"}
                    type={"text"}
                    name={"email"}
                    register={register}
                    errors={errors?.email?.message}
                />
                <AuthInput
                    label={"Your password"}
                    type={"password"}
                    name={"password"}
                    register={register}
                    errors={errors?.password?.message}
                />
                <AuthInput
                    label={"Confirm password"}
                    type={"password"}
                    name={"confirmPassword"}
                    register={register}
                    errors={errors?.confirmPassword?.message}
                />
                <AuthInput
                    label={"Status"}
                    type={"text"}
                    name={"status"}
                    register={register}
                    errors={errors?.status?.message}
                />
                <Picture setPicture={setPicture}/>
                {error && <p>{error.toString()}</p>}
                <Button type="submit" text={"Signup"} loading={isLoading} />
                <Footer>
                    <p>Get an account ? </p>
                    <Link to={"/login"}>Login</Link>
                </Footer>
            </AuthForm>
        </FormContainer>
    );
};

export default Register;
