import styled from "styled-components";
import { theme } from "../../utils/theme";
import { ConfirmIcon } from "../../svg";

const { color } = theme

export const Container = styled.div`
    height: 100%;
    width: 100%;
    background-color: ${color.dark_bg_4};
    box-sizing: border-box;
    border-left: 2px solid ${color.dark_border_1};
    overflow-y: auto;
    position: relative;
`

export const Title = styled.h1`
    color: ${color.dark_text_1};
    margin-bottom: 2px;
`

export const Header = styled.div`
    margin-bottom: 3rem;
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
`
export const Input = styled.input`
    width: 100%;
    height: 2.5rem;
    background-color: ${color.dark_bg_3};
    border-radius: 0.5rem;
    padding-left: 1rem;
    outline: none;
    font-size: 1rem;
    line-height: 1.5em;
    border: none;
    color: white;
    box-sizing: border-box;
    margin-top: 5px;
`
export const Label = styled.label`
    font-weight: bold;
    color: white;
    font-size: 0.875rem;
`

export const InputContainer = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin: 10px auto;
`

export const PictureContainer = styled(InputContainer)`
    &>*{
        width: 100%;
        box-sizing: border-box;
    }
`

export const ChangePassword = styled.div`
    background-color: ${color.dark_bg_1};
    color: ${color.red_1};
    width: 80%;
    margin: 10px auto;
    border-radius: 0.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    cursor: pointer;

    &:hover{
        background-color: ${color.red_1};
        color: ${color.dark_text_1}
    }
`

export const Confirm = styled(ConfirmIcon)`
    cursor: pointer;

    &:hover{
        transform: scale(1.05);
    }
`

export const Footer = styled.div`
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
`