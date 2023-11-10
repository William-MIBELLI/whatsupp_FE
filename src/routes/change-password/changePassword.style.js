import styled from "styled-components";
import { theme } from "../../utils/theme";
import Success from "../../components/success/success";

const { color } = theme


export const Container = styled.div`
    background-color: ${color.dark_bg_2};
    border-left:2px solid ${color.dark_border_1};
    width: 100%;
`

export const Title = styled.h1`
    color: white;
`

export const Header = styled.div`
    margin-top: 30px;
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    width:60%;
    margin: auto;
    margin-top: 30px;

`

export const Error = styled.p`
    color: ${color.red_1};
    font-size: 1rem;
`
export const StyledSuccess = styled(Success)`
    border-radius: 0;
    padding-top: 70px;
    margin: auto;
`

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
`