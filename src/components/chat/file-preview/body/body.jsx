import { useSelector } from "react-redux";
import { Component, Details, Icon, InfoContainer } from "./body.style";
import { selectFiles } from "../../../../store/chat/chat.selector";
import { useEffect, useState } from "react";
import PrimaryText from "../../../primary-text/primaryText";

const Body = ({ file, index }) => {

    const files = useSelector(selectFiles)
    const { fileType } = files[index];
    const [prev, setPrev] = useState(null)

    useEffect(() => {
        if (fileType === 'IMAGE') {
            const reader = new FileReader()
            reader.readAsDataURL(file.file)
            reader.onload = () => {
                setPrev(reader.result)
            }
        } else {
            setPrev(null)
        }
    }, [file])

    return (
        <Component>
            <Icon
                src={prev ? prev : `../../../../../icons/${fileType}.png`}
                alt={`${fileType}`}
            />
            <InfoContainer>
                <PrimaryText>{file.file.name}</PrimaryText>
                <Details>Size :{file.file.size}Ko</Details>  
            </InfoContainer>
        </Component>
    );
};

export default Body;
