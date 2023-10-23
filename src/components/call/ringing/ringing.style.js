import styled from "styled-components";

export const Container = styled.div`
    background-color: ${props => props.theme.color.dark_bg_5};
    position: fixed;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px;
    color: white;
    z-index: 50;
`

export const PictureCaller = styled.img`
    border-radius: 50%;
    width: 100px;
    height: 100px;
    margin-right: 10px;
`

export const Description = styled.div`
    color: white;
    margin: 0 20px;
`