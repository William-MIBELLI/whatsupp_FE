import styled from "styled-components";

export const Container = styled.div`
    position: absolute;
    top: 5px;
    right: 0;  
    left: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
`
export const SwitchIcon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: auto;
    height: 100%;
    width: 100%;
`
export const Text = styled.p`
    margin: 0 10px;
    font-size: 0.6rem;
    color: ${props => props.theme.text_1};
    font-weight: bold;
`