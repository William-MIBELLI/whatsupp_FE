import { getFileType } from "../../../utils/file.utils";
import { Container, Description, Mini, PicPreview } from "./fileMessage.style";
import PrimaryText from "../../primary-text/primaryText";
import SecondaryText from "../../secondary-text/secondaryText";
import { useEffect, useState } from "react";
import { CloudinaryImage } from "@cloudinary/url-gen";

const FileMessage = ({ file, me }) => {
    const { original_filename, bytes: size, secure_url: path, public_id } = file;
    const [image, setImage] = useState(false);
    const [link, setLink] = useState('')

    const extension = path.split("upload")[1].split(".")[1]; // On récupère l'extension du fichier
    const type = getFileType(extension);

    useEffect(() => {
        //Si le fichier est une image on ajoute un flag sur l'url afin que l'user puisse le download
        if (type === "IMAGE") {
            const l = new CloudinaryImage(public_id, { cloudName: process.env.REACT_APP_CLOUD_NAME }).addFlag('attachment').toURL()
            setLink(l)
            setImage(true);
        } else { // Sinon on passe simplement le secure_url du fichier
            setLink(path)
        }
    }, [type]);


    return (
        <Container $me={me}>
            {image ? (
                <a href={link} target="_blank" rel="noreferrer"  download>
                    <PicPreview src={path} />
                </a>
            ) : (
                <>
                    <Mini src={`../../../../../icons/${type}.png`} />
                    <Description>
                        <PrimaryText>{original_filename}</PrimaryText>
                        <SecondaryText>{size}Ko</SecondaryText>
                    </Description>
                    <a href={link} target="_blank" rel="noreferrer" download>
                        <Mini src={`../../../../../icons/download.png`} />
                    </a>
                </>
            )}
        </Container>
    );
};

export default FileMessage;
