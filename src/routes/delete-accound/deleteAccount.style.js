import styled from "styled-components";
import PrimaryText from "../../components/primary-text/primaryText";
import Button from "../../components/button/button";


export const Component = styled.div``;

export const Container = styled.div`
    background-color: ${props => props.theme.bg_2};
    border-left: 2px solid ${props => props.theme.border_1};
    width: 100%;
`;

export const Title = styled.h1`
    color: ${props => props.theme.text_1};
`;

export const Disclaimer = styled(PrimaryText)`
    color: ${props => props.theme.red_1};
`;
export const Form = styled.form`
    width: 60%;
    margin: 40px auto;
    display: flex;
    flex-direction: column;
`;

export const DeleteButton = styled(Button)`
    background-color: ${props => props.theme.red_1};
    &:hover {
        background-color: red;
    }
`;

export const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
`;
