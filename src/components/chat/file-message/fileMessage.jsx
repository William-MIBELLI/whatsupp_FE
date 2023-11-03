import { getFileType } from "../../../utils/file.utils";
import { Container, Description, Mini } from "./fileMessage.style";
import PrimaryText from "../../primary-text/primaryText";
import SecondaryText from "../../secondary-text/secondaryText"
import ImageButton from "../../image-button/imageButton";

const FileMessage = ({ file, me }) => {

    const { original_filename, bytes: size, secure_url: path } = file
    
    const extension = path.split('upload')[1].split('.')[1] // On récupère l'extension du fichier
    const type = getFileType(extension)

    return (
        <Container me={me}>
            <Mini src={`../../../../../icons/${type}.png`} />
            <Description>
                <PrimaryText>
                    {original_filename}
                </PrimaryText>
                <SecondaryText>
                    {size}Ko
                </SecondaryText>
            </Description>
            <a href={path} target="_blank" rel="noreferrer"  download>
                <Mini src={`../../../../../icons/download.png`} />
            </a>
        </Container>
    )
}

export default FileMessage