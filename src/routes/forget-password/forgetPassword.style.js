import styled from "styled-components";
import { theme } from "../../utils/theme";

const { color } = theme

export const Component = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const Title = styled.h2`
    font-size: 1.825rem;
    color: white;
    font-weight: bold;
`

export const Container = styled.form`
    width: 400px;
    background-color: ${color.dark_bg_2};
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    padding: 10px;
    
    *{
        margin: 15px 0;
    }

    p{
        margin: 0;
    }


`
export const Input = styled.input`
    border-radius: 0.3rem;
    border: none;
    outline: none;
    background-color: ${color.dark_bg_6};
    height: 2.5rem;
    padding: 0 0.5rem;
    color: white;
    width: 100%;
    box-sizing: border-box;

    &::placeholder{
        color: ${color.green_2};
    }
`


export const SendButton = styled.button`
    border-radius: 1.5rem;
    border: none;
    outline: none;
    height: 2.5rem;
    background-color: ${color.green_1};
    cursor: pointer;
    color: ${color.dark_text_1};

    &:hover{

    }
`

export const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
`
