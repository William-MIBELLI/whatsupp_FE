import styled from "styled-components";
import SecondaryText from "../../../secondary-text/secondaryText";
import PrimaryText from "../../../primary-text/primaryText";

export const Component = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    min-height: 50%;
`

export const Icon = styled.img`
    height: 160px;
    width: 160px;
    padding: 10px 0;
`

export const Details = styled(SecondaryText)`
    font-weight: 200;
`
export const Name = styled(PrimaryText)`

`

export const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
`