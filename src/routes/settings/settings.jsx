import { useDispatch, useSelector } from "react-redux";
import SecondaryText from "../../components/secondary-text/secondaryText";
import {
    Container,
    Title,
    Form,
    Footer,
    ChangePassword,
    Header,
    PictureContainer,
    StyledAuthInput,
    StyledSucces,
    TurnOffSuccess,
    DeleteAccountLink,
    Main
} from "./settings.style";
import { selectCurrentUser } from "../../store/user/user.selector";
import { useState, useEffect } from "react";
import Picture from "../../components/auth/picture/picture";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateSchema } from "../../utils/validation";
import { Link } from "react-router-dom";
import Button from "../../components/button/button";
import { updateUserOnDb } from "../../service/api.service";
import { updateCurrentUser } from "../../store/user/user.action";
import ErrorMEssage from "../../components/error/error";
import { toggleActiveConvoStatus } from "../../store/chat/chat.action";
import { selectChat } from "../../store/chat/chat.selector";


const Settings = () => {
    const { name, status, accessToken } = useSelector(selectCurrentUser);
    const { activeConversation } = useSelector(selectChat)
    const [newPicture, setNewPicture] = useState();
    const dispatch = useDispatch();
    
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);


    useEffect(() => { //On met lactiveConvo en isDisplayed : false pour afficher les notifs de nouveaux messages
        if (activeConversation) {
            dispatch(toggleActiveConvoStatus(false))
        }
    },[])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(updateSchema),
        mode: "all",
        defaultValues: {
            name: name,
            status: status,
        },
    });

    const onSubmitHandler = async (data) => {
        setLoading(true);
        setError(false);
        setSuccess(false);
        const user = await updateUserOnDb(accessToken, data, newPicture);
        setLoading(false);
        if (user) {
            setSuccess(true);
            return dispatch(updateCurrentUser(user, accessToken));
        }
        setError(true);
    };

    return (
        <Container>
            {success ? (
                <StyledSucces
                    title={"Profile updated"}
                    content={
                        "Your informations has been updated successfully !"
                    }
                >
                    <TurnOffSuccess clickHandler={() => setSuccess(false)} >Back to settings</TurnOffSuccess>
                </StyledSucces>
            ) : (
                <>
                    <Header>
                        <Title>Settings</Title>
                        <SecondaryText>
                            You can manage your user's informations here.
                        </SecondaryText>
                        </Header>
                        <Main>
                            <Form onSubmit={handleSubmit(onSubmitHandler)}>
                                <StyledAuthInput
                                    errors={errors?.name?.message}
                                    label={"Your name"}
                                    name={"name"}
                                    register={register}
                                    type={"text"}
                                />
                                <StyledAuthInput
                                    errors={errors?.status?.message}
                                    label={"Your status"}
                                    name={"status"}
                                    register={register}
                                    type={"text"}
                                />
                                <PictureContainer>
                                    <Picture setPicture={setNewPicture} />
                                </PictureContainer>
                                <Button
                                    text={"Save changes"}
                                    type={"submit"}
                                    loading={loading}
                                />
                                {error && (
                                    <ErrorMEssage message='Something goes wrong, please try again.'/>
                                )}
                            </Form>
                                <Footer>
                                <Link to={"/change-password"}>
                                    <ChangePassword>
                                        Change your password
                                    </ChangePassword>
                                    </Link>
                                    <Link to={'/delete-account'}>
                                        <DeleteAccountLink>
                                            Delete your account
                                        </DeleteAccountLink>
                                    </Link>
                            </Footer>

                        </Main>
                </>
            )}
        </Container>
    );
};

export default Settings;
