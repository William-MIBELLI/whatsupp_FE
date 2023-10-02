import { useSelector } from "react-redux";
import { Component, DeleteIcon, Mini } from "./thumbnails.style";
import { selectFiles } from "../../../../store/chat/chat.selector";


const Thumbnails = ({ setIndex, onDeleteClick }) => {

    const files = useSelector(selectFiles);

    const onClickHandler = (index) => {
        setIndex(index)
    }

    return (
        <Component>
            {
                files.map((file, ind) => {
                    console.log(file)
                    const index = ind
                    return (
                        <>
                            <Mini key={ind} onClick={() => onClickHandler(index)} src={ file.preview !== undefined ? file.preview : `../../../../../icons/${file.fileType}.png`} alt={file.file.name} />
                            <DeleteIcon onClick={() => onDeleteClick(index)}>&#10060;</DeleteIcon>
                        </>
                    )
                })
            }
        </Component>
    )
}

export default Thumbnails