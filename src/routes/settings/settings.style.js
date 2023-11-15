import styled from "styled-components";
import { ConfirmIcon } from "../../svg";
import AuthInput from "../../components/auth/auth-input/authInput";
import Success from "../../components/success/success";
import PrimaryText from "../../components/primary-text/primaryText";


export const Container = styled.div`
    height: 100%;
    width: 100%;
    background-color: ${props => props.theme.bg_2};
    box-sizing: border-box;
    border-left: 2px solid ${props => props.theme.border_1};
    overflow-y: auto;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Title = styled.h1`
    color: ${props => props.theme.text_1};
    margin-bottom: 2px;
`;

export const Header = styled.div`
    margin-bottom: 3rem;
`;

export const Form = styled.form`
    display: flex;
    width: 100%;
    margin: 0 auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    button {
        width: 100%;
    }
`;
export const Input = styled.input`
    width: 100%;
    height: 2.5rem;
    background-color: ${props => props.theme.bg_3};
    border-radius: 0.5rem;
    padding-left: 1rem;
    outline: none;
    font-size: 1rem;
    line-height: 1.5em;
    border: none;
    color: white;
    box-sizing: border-box;
    margin-top: 5px;
`;

export const PictureContainer = styled.div`
    width: 100%;
    margin: 10px 0;
    & > * {
        width: 100%;
        box-sizing: border-box;
    }
`;

export const ChangePassword = styled.div`
    background-color: ${props => props.theme.bg_1};
    color: ${props => props.theme.red_1};
    margin: 10px auto;
    padding: 0 10px;
    border-radius: 0.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
        background-color: ${props => props.theme.red_1};
        color: ${props => props.theme.text_1};
    }
`;

export const DeleteAccountLink = styled(ChangePassword)`
    background: ${props => props.theme.red_1};
    color: ${props => props.theme.text_1};

    &:hover {
        background-color: ${props => props.theme.bg_1};
        color: ${props => props.theme.red_1};
    }
`;

export const Confirm = styled(ConfirmIcon)`
    cursor: pointer;

    &:hover {
        transform: scale(1.05);
    }
`;

export const Footer = styled.div`
    ${
        "" /* position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%); */
    }
    display: flex;
    justify-content: space-evenly;
    width: 100%;
`;

export const StyledAuthInput = styled(AuthInput)`
    width: 100%;
`;

export const StyledSucces = styled(Success)`
    margin: auto;
`;
export const TurnOffSuccess = styled(PrimaryText)`
    cursor: pointer;
`;

export const Main = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 50%;
    min-width: 370px;
`;
