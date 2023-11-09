import { useParams } from "react-router-dom";
import { Component } from "./resetPassword.style";
import AuthForm from "../../components/auth/auth-form/authForm";
import AuthInput from "../../components/auth/auth-input/authInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../components/button/button";
import { resetPasswordSchema } from "../../utils/validation";
import { useState } from "react";
import { resetPasswordOnDb } from "../../service/api.service";
import Success from "../../components/success/success";

const ResetPassword = () => {
    const { token } = useParams();

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(resetPasswordSchema),
        mode: "onSubmit",
    });

    const onSubmitHandler = async (data) => {
        setLoading(true);
        setError("");
        const r = await resetPasswordOnDb({ ...data, token });
        setLoading(false);
        if (!r) {
            console.log('on rentre dans error')
            return setError("failed to reset password, please try again");
        }
        return setSuccess(true);
    };

    return (
        <Component>
            {success ? (
                <Success
                    title={'Reset done'}
                    content={'Your password is successfully updated, you can log in with it.'}
                    link={'login'}
                />
            ) : (
                <AuthForm
                    title="Reset Your password"
                    submitHandler={handleSubmit(onSubmitHandler)}
                    description="Just 3 fields to go."
                >
                    <AuthInput
                        register={register}
                        label={"Email address"}
                        name={"email"}
                        errors={errors?.email?.message}
                    />
                    <AuthInput
                        register={register}
                        label={"Password"}
                        type={"password"}
                        name={"password"}
                        errors={errors?.password?.message}
                    />
                    <AuthInput
                        register={register}
                        label={"Confirm password"}
                        name={"confirm"}
                        type={"password"}
                        errors={errors?.confirm?.message}
                    />
                    <Button
                        type={"submit"}
                        text={"Reset my password"}
                        loading={loading}
                    />
                    {error && <p>{error}</p>}
                </AuthForm>
            )}
        </Component>
    );
};

export default ResetPassword;
