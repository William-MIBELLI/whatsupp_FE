import styled from "styled-components";

export const Container = styled.div`
    position: fixed;
    width: 400px;
    height: 60%;
    background-image: linear-gradient(black, black), url(${({ bg }) => bg});
    background-size: cover;
    background-blend-mode: saturation;
    border-radius: 5px;
`