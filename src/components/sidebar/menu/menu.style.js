import styled from "styled-components";

export const Component = styled.ul`
    list-style: none;
    position: absolute;
    right: 0;
    top: 100%;
    padding-left: 0;
    background-color: ${(props) => props.theme.bg_2};
`;

export const MenuItem = styled.li`
    height: 3rem;
    text-align: left;
    padding: 0 20px;
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover {
        background-color: ${(props) => props.theme.bg_1};
    }
`;
