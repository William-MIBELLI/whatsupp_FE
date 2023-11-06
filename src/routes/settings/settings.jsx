import { useSelector } from "react-redux";
import SecondaryText from "../../components/secondary-text/secondaryText";
import {
    Container,
    Title,
    Form,
    Footer,
    Label,
    Input,
    InputContainer,
    ChangePassword,
    Confirm,
    Header,
    PictureContainer,
} from "./settings.style";
import { selectCurrentUser } from "../../store/user/user.selector";
import { useState, useEffect } from "react";
import Picture from "../../components/auth/picture/picture";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateSchema } from "../../utils/validation";

const initialData = {
    name: "",
    status: "",
    pictureUrl: "",
};

const Settings = () => {

    const currentUser = useSelector(selectCurrentUser);
    const [userData, setUserdata] = useState(initialData);
    const [picture, setPicture] = useState()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(updateSchema),
        mode: 'all'
    })
    
    //On recupère les valeurs des inputs dans le usestate
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setUserdata({ ...userData, [name]: value });
        console.log(userData);
    };

    //On envoie les datas au server
    const onSubmitHandler = async () => {

    }
    
    //On récupère les infos du currentUser que lon stocke dans le usestate
    useEffect(() => {
        const { name, status, pictureUrl } = currentUser;
        setUserdata({
            name,
            status,
            pictureUrl,
        });
    }, [currentUser]);

    return (
        <Container>
            <Header>
                <Title>Settings</Title>
                <SecondaryText>
                    You can manage your user's informations here.
                </SecondaryText>
            </Header>
            <Form>
                <InputContainer>
                    <Label>Name</Label>
                    <Input value={userData.name} name="name" onChange={onChangeHandler}/>
                </InputContainer>
                <InputContainer>
                    <Label>Your status</Label>
                    <Input value={userData.status} name="status" onChange={onChangeHandler}/>
                </InputContainer>
                <PictureContainer>
                    <Picture setPicture={setPicture}/>
                </PictureContainer>
                <ChangePassword>Reset your password</ChangePassword>
            </Form>
            <Footer>
                <Confirm />
            </Footer>
        </Container>
    );
};

export default Settings;
