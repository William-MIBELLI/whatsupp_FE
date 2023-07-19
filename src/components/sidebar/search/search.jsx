import { useState } from "react";
import { ArrowIcon, FilterIcon, ReturnIcon, SearchIcon } from "../../../svg";
import { Component, Container, Input } from "./search.style";

const Search = () => {

    const [show, setShow] = useState(false)
    const [search, setSearch] = useState('')

    const onChangeHandler = (event) => {
        const { value } = event.target
        setSearch(value)
    }

    return (
        <Component>
            <Container>
                {
                    show ? (
                        <ReturnIcon/>
                    ) : (
                        <SearchIcon/>
                    )
                }
                <Input placeholder="Search or start a new chat"
                    onFocus={() => setShow(true)}
                    onBlur={() =>  search.length === 0 && setShow(false)}
                    onChange={onChangeHandler}
                />
            </Container>
            <FilterIcon/>
        </Component>
    )
}

export default Search