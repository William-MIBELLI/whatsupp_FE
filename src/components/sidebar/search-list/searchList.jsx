import SearchListItem from "../search-list-item/searchListItem";
import { Component, Header } from "./searchList.style";

const SearchList = ({ result, setKeyword }) => {

    return (
        <Component>
            <Header>Contact</Header>
            {result &&
                result.map((user) => {
                    return <SearchListItem user={user} key={user._id} setKeyword={setKeyword} />;
                })}
        </Component>
    );
};

export default SearchList;
