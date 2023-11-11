import SecondaryText from "../../components/secondary-text/secondaryText";
import {
    Container,
    Header,
    Title,
    Form,
    StyledSuccess,
    ButtonContainer,
} from "./changePassword.style";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { changePasswordSchema } from "../../utils/validation";
import AuthInput from "../../components/auth/auth-input/authInput";
import Button from "../../components/button/button";
import { useState } from "react";
import { changePasswordOnDb } from "../../service/api.service";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import ErrorMEssage from "../../components/error/error";

const ChangePassword = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const { accessToken } = useSelector(selectCurrentUser);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(changePasswordSchema),
    });

    const onSubmitHandler = async (data) => {
        setLoading(true);
        const r = await changePasswordOnDb(accessToken, data);
        setLoading(false);
        if (!r) {
            setSuccess(false);
            return setError(true);
        }
        setSuccess(true);
        setError(false);
        return;
    };

    return (
        <Container>
            {success ? (
                <StyledSuccess
                    title={"Password is updated!"}
                    content={
                        "Your password is now updated, you can use it on your next connection."
                    }
                    link={"settings"}
                />
            ) : (
                <>
                    <Header>
                        <Title>Change your password</Title>
                        <SecondaryText>
                            You want a stronger password ? you are on the good
                            place.
                        </SecondaryText>
                    </Header>
                    <Form onSubmit={handleSubmit(onSubmitHandler)}>
                        <ErrorMEssage message='⚠️ For security reasons, you have to provide your
                            current password.'/>
                            
                        <AuthInput
                            label={"Your password"}
                            name={"password"}
                            type={"password"}
                            register={register}
                            errors={errors?.password?.message}
                        />
                        <AuthInput
                            label={"Your NEW password"}
                            name={"newPassword"}
                            type={"password"}
                            register={register}
                            errors={errors?.newPassword?.message}
                        />
                        <AuthInput
                            label={"Confirm it"}
                            name={"confirmNewPassword"}
                            type={"password"}
                            register={register}
                            errors={errors?.confirmNewPassword?.message}
                        />
                        <ButtonContainer>
                            <Button
                                type={"submit"}
                                text={"Update your password"}
                                loading={loading}
                            />
                        </ButtonContainer>
                        {error && (
                            <ErrorMEssage message='Something goes wrong, please try again.'/>
                        )}
                    </Form>
                </>
            )}
        </Container>
    );
};

export default ChangePassword;
