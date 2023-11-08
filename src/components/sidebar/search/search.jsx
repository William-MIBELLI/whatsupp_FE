import { useEffect, useState } from "react";
import {  FilterIcon, ReturnIcon, SearchIcon } from "../../../svg";
import { Component, Container, Input, ReturnContainer } from "./search.style";

const Search = ({ setKeyword }) => {

    const [show, setShow] = useState(false)
    const [search, setSearch] = useState('')

    const onChangeHandler = (event) => {
        const { value } = event.target
        setSearch(value)
    }

    const onKeyDownHandler = (event) => {
        if (event.key === 'Enter') {
            setKeyword(search)
        }
    }

    useEffect(() => {
        if (search.length === 0) {
            setKeyword(search)
        }
    }, [search])
    

    //Reset linput search et réaffiche les convos
    const onReturnClick = () => {
        console.log('click return')
        setSearch('')
        setKeyword('')
    }

    return (
        <Component>
            <Container>
                {
                    show ? (
                        <ReturnContainer onClick={onReturnClick}>
                            <ReturnIcon/>
                        </ReturnContainer>
                    ) : (
                        <SearchIcon/>
                    )
                }
                <Input placeholder="Search or start a new chat"
                    name="search"
                    onFocus={() => setShow(true)}
                    onBlur={() =>  search.length === 0 && setShow(false)}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyDownHandler}
                    value={search}
                />
            </Container>
        </Component>
    )
}

export default Search