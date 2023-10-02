import styled from "styled-components";

export const Component = styled.div`
    width: auto;
    display: flex;
    margin: 10px 0;
    justify-content: center;
`

export const Mini = styled.img`
    height: 50px;
    width: 50px;
    cursor: pointer;
    margin: 8px;
    border-radius: 5px;
`

export const DeleteIcon = styled.div`
    border-radius: 50%;
    width: 16px;
    height: 16px;
    margin-left: -16px;
    margin-top: -4px;
    cursor: pointer;

    &:hover{
        scale: 1.1;
    }
`