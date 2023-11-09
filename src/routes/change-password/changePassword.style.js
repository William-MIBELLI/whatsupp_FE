import styled from "styled-components";
import { theme } from "../../utils/theme";
import Success from "../../components/success/success";

const { color } = theme


export const Container = styled.div`
    background-color: ${color.dark_bg_4};
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

    button{
        margin-top: 40px;
    }
`

export const Error = styled.p`
    color: ${color.red_1};
    font-size: 1rem;
`
export const StyledSuccess = styled(Success)`
    width: 100%;
    border-radius: 0;
    padding-top: 70px;
`