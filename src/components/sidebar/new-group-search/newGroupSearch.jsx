import { useContext, useState } from "react";
import {
    Arrow,
    ArrowContainer,
    Container,
    Header,
    Input,
    Body,
    Footer,
    Confirm,
} from "./newGroupSearch.style";
import Select from "react-select";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../store/user/user.selector";
import { createGroupOnDb, searchUserOnDb } from "../../../service/api.service";
import { theme } from '../../../utils/theme'
import { ConfirmIcon } from "../../../svg";
import { CreateNewGroupContext } from "../sidebar";

const NewGroupSearch = () => {

    const [inputValue, setInputValue] = useState('')
    const { accessToken } = useSelector(selectCurrentUser)
    const [searchResult, setSearchResult] = useState([])
    const [selectedUsers, setSelectedUsers] = useState([])
    const { color } = theme
    const { setCreateNewGroup } = useContext(CreateNewGroupContext)
    const [groupeName, setGroupName] = useState('')

    //On récupère l'input du select
    const onInputChangeHandler = (value) => {
        setInputValue(value)
    }

    //Quand luser click sur entrée, on lance la recherche dans la db
    const onKeyDownHandler = async (e) => {
        if (inputValue.length <= 0 || e.key !== 'Enter') {
            console.log('if dans recherche')
            return
        }
        setSearchResult([])
        const res = await searchUserOnDb(accessToken, inputValue)
        if (res) {
            console.log(res)
            const temp = res.map(user => {
                return {
                    label: user.name,
                    value: user._id,
                    picture: user.pictureUrl
                }
            })
            setSearchResult(temp)
        }
    }

    //Stocke les users selectionnés dans un state
    const onChangeHandler = (userArray) => {
        setSelectedUsers(userArray)
    }

    //Fermer et revenir aux conversations
    const onCloseHandler = () => {
        setCreateNewGroup(false)
    }

    //Création du groupe, on requete le backend
    const onCreateGroup = async () => {
        if (groupeName.length <= 0 || selectedUsers.length <= 0) {
            console.log('pas de nom de groupe ou pas duser selected')
            return
        }
        const mappedUsers = selectedUsers.map(user => user.value)
        console.log(selectedUsers)
        const res = await createGroupOnDb(accessToken, groupeName, mappedUsers)
        console.log('res du server : ', res)
    }

    const onChangeGroupName = (event) => {
        setGroupName(event.target.value)
    }

    return (
        <Container>
            <Header>
                <ArrowContainer onClick={onCloseHandler}>
                    <Arrow/>
                </ArrowContainer>
                <Input placeholder="Group name..." type="text" value={groupeName} onChange={onChangeGroupName}/>
            </Header>
            <Body>
                <Select
                    styles={{
                        control: (baseStyles, state) => ({
                            background: 'transparent',
                            display: 'flex',
                        }),
                        input: (baseStyles, state) => ({
                            ...baseStyles,
                            color: 'white',
                        }),
                        container: (baseStyles, state) => ({
                            ...baseStyles,
                            border: 'none',
                            
                        }),
                        menu: (baseStyles, state) => ({
                            maxHeight: '150px',
                            overflowY: 'auto',
                            '::-webkit-scrollbar': {
                                width: '5px',
                                background: 'transparent'
                            },
                            '::-webkit-scrollbar-thumb': {
                                backgroundColor: color.dark_bg_5
                            },
                            scrollBehavior: 'auto',
                            msScrollRails: 'railed'
                            
                        }),
                        option: (baseStyles, state) => ({
                            ...baseStyles,
                            color: 'white',
                            backgroundColor: state.isFocused ? color.dark_bg_2 : 'transparent',
                            cursor: 'pointer'
                        }),
                    }}
                    options={searchResult}
                    inputValue={inputValue}
                    isMulti
                    placeholder='Look for users...' 
                    onInputChange={onInputChangeHandler}
                    onKeyDown={onKeyDownHandler}
                    onChange={onChangeHandler}
                    menuShouldBlockScroll={false}
                    menuShouldScrollIntoView={false}
                    
                />
            </Body>
            <Footer onClick={onCreateGroup}>
                <Confirm/>
            </Footer>
        </Container>
    );
};

export default NewGroupSearch;
