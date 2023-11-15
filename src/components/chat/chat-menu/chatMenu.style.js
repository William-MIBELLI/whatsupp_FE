import styled from "styled-components";

export const Container = styled.div`
    background-color: green;
    position: absolute;
    top: 100%;
    right: 0;
    z-index: 100;
`;

export const MenuItem = styled.div`
    background-color: ${props => props.theme.bg_2};
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${props => props.theme.text_2};
    padding: 0 5px;
    cursor: pointer;
    position: relative;

    &:hover {
        background-color: ${props => props.theme.bg_1};
    }
`;

export const RemoveList = styled.div`
    background-color: green;
    position: absolute;
    right: 100%;
    top: 0;
`;

export const RemoveItem = styled(MenuItem)`
    display: flex;
    padding: 0 10px;
    justify-content: space-between;
    align-items: center;

    &:hover {
        background-color: ${props => props.theme.red_1};
        color: ${props => props.theme.text_1};
    }
`;

export const Mini = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
`;
