import Button from "../../components/button/button";
import SecondaryText from "../../components/secondary-text/secondaryText";
import {
    Component,
    Container,
    Input,
    Title,
    ButtonContainer,
} from "./forgetPassword.style";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { emailPasswordSchema } from "../../utils/validation";
import { forgetPasswordOnDb } from "../../service/api.service";
import { useState } from "react";
import { Link } from "react-router-dom";
import Success from "../../components/success/success";
import ErrorMEssage from "../../components/error/error";

const ForgetPassword = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(emailPasswordSchema),
        mode: "onSubmit",
    });

    const onSubmitHandler = async (data) => {
        setLoading(true);
        const r = await forgetPasswordOnDb(data.email);
        reset();
        if (!r) {
            //Si la requête a échoué on affiche une erreur
            setError(true);
            setLoading(false);
            return;
        }
        setSuccess(true); // Sinon on affiche <Success/>
    };

    return (
        <Component>
            {success ? (
                <Success
                    link={"login"}
                    title={"Email sent"}
                    content={
                        "An email has been sent with instructions for reset your password."
                    }
                />
            ) : (
                <Container onSubmit={handleSubmit(onSubmitHandler)}>
                    <Title>Forget password ?</Title>
                    <SecondaryText>
                        Please give your email address for get your reset link.
                    </SecondaryText>
                    <Input
                        placeholder="Your email address..."
                        {...register("email")}
                    />
                    {errors.email?.message && (
                            <ErrorMEssage message={errors.email?.message } />
                    )}
                    <ButtonContainer>
                        <Button
                            text={"Send reset email"}
                            type={"submit"}
                            loading={loading}
                        />
                    </ButtonContainer>
                    {error && (
                        <ErrorMEssage message={'Something goes wrong, please try again.'} />
                    )}
                    <Link to={"/login"}>
                        <SecondaryText>Back to login</SecondaryText>
                    </Link>
                </Container>
            )}
        </Component>
    );
};

export default ForgetPassword;
