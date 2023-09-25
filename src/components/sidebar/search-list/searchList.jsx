import SearchListItem from "../search-list-item/searchListItem";
import { Component, Header } from "./searchList.style";

const SearchList = ({ result }) => {
    console.log("result : ", result);

    return (
        <Component>
            <Header>Contact</Header>
            {result &&
                result.map((user) => {
                    return <SearchListItem user={user} key={user._id} />;
                })}
        </Component>
    );
};

export default SearchList;
