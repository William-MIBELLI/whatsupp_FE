import styled from "styled-components";
import { ArrowIcon, LockIcon } from "../../../svg";

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    z-index: 40;
`

export const Arrow = styled(ArrowIcon)`
    fill: white;
`

export const ArrowContainer = styled.div`
    transform: rotate(180deg) scale(2);
    cursor: pointer;
    margin-left: 10px;
`
export const Lock = styled(LockIcon)`
    fill: white;
`
export const Title = styled.div`
    color: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: auto;
`