import styled from "styled-components";
import Success from "../../components/success/success";


export const Container = styled.div`
    background-color: ${props => props.theme.bg_2};
    border-left: 2px solid ${props => props.theme.border_1};
    width: 100%;
`;

export const Title = styled.h1`
    color: white;
`;

export const Header = styled.div`
    margin-top: 30px;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 60%;
    margin: auto;
    margin-top: 30px;
`;

export const StyledSuccess = styled(Success)`
    border-radius: 0;
    padding-top: 70px;
    margin: auto;
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
`;
