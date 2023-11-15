import styled from "styled-components";

export const Component = styled.div`
    display: flex;
    flex-direction: column;
    cursor: pointer;

    &:hover {
        background-color: ${(props) => props.theme.bg_2};
    }
`;

export const Container = styled.div`
    display: flex;
    align-items: center;
    padding: 0 20px;
    height: 70px;
`;

export const PictureContainer = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
    }
`;

export const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    text-align: left;
    margin-left: 20px;
`;

export const Separator = styled.div`
    margin-left: 4rem;
    border: 1px solid ${(props) => props.theme.border_1};
`;
