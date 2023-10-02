import { useSelector } from "react-redux";
import { Component, Details, Icon } from "./body.style";
import { selectFiles, selectImagePreview } from "../../../../store/chat/chat.selector";
import { useState, useEffect } from "react";

const Body = ({ file, index }) => {

    const files = useSelector(selectFiles)
    const { fileType } = files[index];
    


    return (
        <Component>
            <Icon
                src={files[index]?.preview !== undefined ? files[index].preview : `../../../../../icons/${fileType}.png`}
                alt={`${fileType}`}
            />
            <Details>{file.file.size}Ko</Details>
        </Component>
    );
};

export default Body;
