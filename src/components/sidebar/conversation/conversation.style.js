import styled, { css } from "styled-components";
import SecondaryText from "../../secondary-text/secondaryText";
import PrimaryText from "../../primary-text/primaryText";

export const Component = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${(props) => props.theme.border_1};
    cursor: pointer;

    &:hover {
        background-color: ${(props) => props.theme.bg_2};
    }
`;

export const LeftSide = styled.div`
    padding: 0 19px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 70%;
    box-sizing: border-box;
`;

export const ImgContainer = styled.div`
    max-width: 40px;
    max-height: 40px;
    min-width: 40px;
    min-height: 40px;
    width: 40px;
    height: 40px;
    overflow: hidden;
    border-radius: 50%;

    & img {
        width: 100%;
        height: 100%;
    }

    border: ${(props) => (props.isonline ? `4px solid ${props.theme.green_1}` : "")};
`;

export const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    text-align: left;
    margin-left: 1rem;

    width: 70%;
`;

export const ContactName = styled(PrimaryText)`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
`;

export const LastMessage = styled(SecondaryText)`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
`;

export const RightSide = styled.div`
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0;
    padding-right: 10px;
    overflow: hidden;
    font-size: small;
    color: ${(props) => props.theme.text_2};

    p{
        margin: 5px 0;
    }
`;

export const Badge = styled.div`
    background-color: ${props => props.theme.red_1};
    border-radius: 50%;
    width: 22px;
    height: 22px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const TypingText = styled.p`
    color: ${(props) => props.theme.green_1};
    font-size: 0.9rem;
    margin: 0;
`;
