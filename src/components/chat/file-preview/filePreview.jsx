import { useDispatch, useSelector } from 'react-redux'
import { Container } from './filePreview.style'
import { selectFiles } from '../../../store/chat/chat.selector'
import { useEffect, useState } from 'react'
import Header from './header/header'
import Body from './body/body'
import Thumbnails from './thumbnails/thumbnails'
import { removeFile } from '../../../store/chat/chat.action'

const FilePreview = () => {

    const files = useSelector(selectFiles)
    const [index, setIndex] = useState(0)
    const dispatch = useDispatch()

    //Suppression d'un fichier dans le thumbnails
    const onDeleteClick = index => {
        setIndex(0)
        dispatch(removeFile(index, files))
    }

    return (
        <Container>
            <Header name={files[index]?.file?.name} />
            <Body file={files[index]} index={index}/>
            <Thumbnails setIndex={setIndex} onDeleteClick={onDeleteClick} />
        </Container>
    )
}

export default FilePreview