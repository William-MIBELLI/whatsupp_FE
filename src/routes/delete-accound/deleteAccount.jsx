import AuthInput from "../../components/auth/auth-input/authInput";
import SecondaryText from "../../components/secondary-text/secondaryText";
import { Container, Title, Disclaimer, Form, DeleteButton, ButtonContainer } from "./deleteAccount.style";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../utils/validation";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { deleteUserOnDb } from "../../service/api.service";
import { useContext, useState } from "react";
import { SocketContext } from "../../App";
import { logoutOutUser } from "../../store/user/user.action";
import ErrorMEssage from "../../components/error/error";

const DeleteAccount = () => {

    const { accessToken, _id: userId } = useSelector(selectCurrentUser)
    const { socket } = useContext(SocketContext)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema),
        mode: 'onSubmit'
    })

    //On call l'api avec les credentials
    const onSubmitHandler = async (data) => {
        setLoading(true)
        setError(false)
        const r = await deleteUserOnDb(accessToken, data)
        if (r) { //Si la requete s'est bien passé, on emit user-logout et on le logout de redux
            socket.emit('user-logout', userId)
            return dispatch(logoutOutUser())
        }
        setError(true)
        setLoading(false)
    }

    return <Container>
        <Title>Delete Your account</Title>
        <Disclaimer>Be care, delete your account is an irrevocable action. </Disclaimer>
        <Disclaimer>All your messages, your conversations, and your files will be deleted.</Disclaimer>
        <SecondaryText>If you are sure about it, please juste provides your credentials below.</SecondaryText>
        <Form onSubmit={handleSubmit(onSubmitHandler)}>
            <AuthInput
                name={'email'}
                errors={errors?.email?.message}
                register={register}
                label={'Your email'}
                type={'text'}
            />
            <AuthInput
                name={'password'}
                errors={errors?.password?.message}
                register={register}
                label={'Your password'}
                type={'password'}
            />
            <ButtonContainer>
                <DeleteButton text={'Delete account'} type={'submit'} loading={loading} />
            </ButtonContainer>
            {
                error && <ErrorMEssage message={'Something goes wrong, please try again.'} />
            }
        </Form>
    </Container>;
};

export default DeleteAccount;
