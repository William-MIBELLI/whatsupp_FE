import styled from "styled-components";

export const Component = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const Header = styled.div`
    height: 50px;
    padding-left: 40px;
    padding-bottom: 10px;
    color: ${(props) => props.theme.green_1};
    text-align: left;
    display: flex;
    align-items: flex-end;
    background-color: ${(props) => props.theme.bg_1};
    border-bottom: 1px solid ${(props) => props.theme.border_2};
`;
