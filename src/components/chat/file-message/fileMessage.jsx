import { getFileType } from "../../../utils/file.utils";
import { Container, Description, Mini } from "./fileMessage.style";
import PrimaryText from "../../primary-text/primaryText";
import SecondaryText from "../../secondary-text/secondaryText"
import ImageButton from "../../image-button/imageButton";

const FileMessage = ({ file, me }) => {

    const { originalname, size, path, mimetype } = file
    const url = `${process.env.REACT_APP_API_ENDPOINT}/${path}`
    const type = getFileType(mimetype)

    return (
        <Container me={me}>
            <Mini src={`../../../../../icons/${type}.png`} />
            <Description>
                <PrimaryText>
                    {originalname}
                </PrimaryText>
                <SecondaryText>
                    {size}Ko
                </SecondaryText>
            </Description>
            <a href={url} target="_blank" rel="noreferrer"  download>
                <Mini src={`../../../../../icons/download.png`} />
            </a>
        </Container>
    )
}

export default FileMessage