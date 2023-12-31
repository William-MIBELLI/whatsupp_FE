import { useContext, useState, useRef, useEffect } from "react";
import {
    Arrow,
    ArrowContainer,
    Container,
    Header,
    Input,
    Body,
    Footer,
} from "./newGroupSearch.style";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../../store/user/user.selector";
import { createGroupOnDb, searchUserOnDb } from "../../../service/api.service";
import { globalTheme } from "../../../utils/theme";
import { CreateNewGroupContext } from "../sidebar";
import { fetchConversationsAsync } from "../../../store/chat/chat.action";
import ErrorMessage from "../../error/error";
import Button from "../../button/button";

const NewGroupSearch = () => {
    const [inputValue, setInputValue] = useState("");
    const { accessToken } = useSelector(selectCurrentUser);
    const [searchResult, setSearchResult] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const theme = globalTheme.light;
    const { setCreateNewGroup } = useContext(CreateNewGroupContext);
    const [groupeName, setGroupName] = useState("");
    const dispatch = useDispatch();
    const [displayError, setDisplayError] = useState(false);

    //On récupère l'input du select
    const onInputChangeHandler = (value) => {
        setInputValue(value);
    };

    //Quand luser click sur entrée, on lance la recherche dans la db
    // const onKeyDownHandler = async (e) => {
    //     // if (inputValue.length <= 0 || e.key !== 'Enter') {
    //     //     return
    //     // }
    //     setSearchResult([])
    //     const res = await searchUserOnDb(accessToken, inputValue)
    //     if (res) {
    //         const temp = res.map(user => {
    //             return {
    //                 label: user.name,
    //                 value: user._id,
    //                 picture: user.pictureUrl
    //             }
    //         })
    //         setSearchResult(temp)
    //     }
    // }

    const searchUser = async () => {
        setSearchResult([]); //On reset searchResult
        if (inputValue === "") {
            //Si linput est vide, on return pour éviter une request inutile
            return;
        }
        const res = await searchUserOnDb(accessToken, inputValue); //On call le backend
        if (res) {
            const temp = res.map((user) => {
                return {
                    label: user.name,
                    value: user._id,
                    picture: user.pictureUrl,
                };
            });
            setSearchResult(temp); //On stocke le resultat dans searchResult
        }
    };

    //Quand luser cherche un user, on lance la recherche a chaque fois que la valeur change
    useEffect(() => {
        searchUser();
    }, [inputValue]);

    //Stocke les users selectionnés dans un state
    const onChangeHandler = (userArray) => {
        setSelectedUsers(userArray);
    };

    //Fermer et revenir aux conversations
    const onCloseHandler = () => {
        setCreateNewGroup(false);
    };

    //Création du groupe, on requete le backend
    const onCreateGroup = async () => {
        if (groupeName.length <= 0 || selectedUsers.length <= 1) {
            setDisplayError(true); // Si pas de nom de groupe ou pas d'users selectionnés, on affiche une erreur
            return;
        }

        const mappedUsers = selectedUsers.map((user) => user.value); //On récup les usersId
        const res = await createGroupOnDb(accessToken, groupeName, mappedUsers);

        if (res) {
            //Si la création du group est OK, on fetchConvo et on ferme longlet
            dispatch(fetchConversationsAsync(accessToken));
            setCreateNewGroup(false);
        }
    };

    //Gestion de linput pour le nom du groupe
    const onChangeGroupName = (event) => {
        setGroupName(event.target.value);
    };

    return (
        <Container>
            <Header>
                <ArrowContainer onClick={onCloseHandler}>
                    <Arrow />
                </ArrowContainer>
                <Input
                    placeholder="Group name..."
                    type="text"
                    value={groupeName}
                    onChange={onChangeGroupName}
                />
            </Header>
            <Body>
                <Select
                    styles={{
                        control: (baseStyles, state) => ({
                            background: "transparent",
                            display: "flex",
                        }),
                        input: (baseStyles, state) => ({
                            ...baseStyles,
                            color: theme.text_1,
                        }),
                        container: (baseStyles, state) => ({
                            ...baseStyles,
                            border: "none",
                        }),
                        menu: (baseStyles, state) => ({
                            maxHeight: "150px",
                            overflowY: "auto",
                            "::-webkit-scrollbar": {
                                width: "5px",
                                background: "transparent",
                            },
                            "::-webkit-scrollbar-thumb": {
                                backgroundColor: theme.bg_5,
                            },
                            scrollBehavior: "auto",
                            msScrollRails: "railed",
                        }),
                        option: (baseStyles, state) => ({
                            ...baseStyles,
                            color: theme.text_1,
                            backgroundColor: state.isFocused
                                ? theme.bg_2
                                : "transparent",
                            cursor: "pointer",
                        }),
                    }}
                    options={searchResult}
                    inputValue={inputValue}
                    isMulti
                    placeholder="Look for users..."
                    onInputChange={onInputChangeHandler}
                    onChange={onChangeHandler}
                    menuShouldBlockScroll={false}
                    menuShouldScrollIntoView={false}
                />
            </Body>
            <Footer>
                <Button text={"Create group"} clickHandler={onCreateGroup} />
            </Footer>
            {displayError && (
                <ErrorMessage message="Please provide a group name and select atleast 2 users." />
            )}
        </Container>
    );
};

export default NewGroupSearch;
