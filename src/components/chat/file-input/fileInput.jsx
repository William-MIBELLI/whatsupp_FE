import { useRef } from "react";
import ImageButton from "../../image-button/imageButton";
import { AttachmentIcon } from "../../../svg";
import { acceptedMimeType, getFileType } from "../../../utils/file.utils";
import { useDispatch, useSelector } from "react-redux";
import { addFile } from "../../../store/chat/chat.action";
import { selectFiles } from "../../../store/chat/chat.selector";

const FileInput = () => {
    const inputRef = useRef();
    const dispatch = useDispatch();
    const existingFiles = useSelector(selectFiles);

    //Click sur l'input
    const onCLickHandler = (event) => {
        inputRef.current.click();
    };

    //Controle et recuperation des fichiers de linput
    const onChangeHandler = async (event) => {
        const files = Array.from(event.target.files).filter((f) =>
            acceptedMimeType.includes(f.type)
        );
        const mappedFiles = files.map((file) => {
            const { type } = file;
            const fileToSave = {
                file,
                fileType: getFileType(type),
            };
            //Si le fichier est une image, on crée un miniature en Base64
            if (getFileType(type) === "IMAGE") {
                const fr = new FileReader();
                fr.readAsDataURL(file);
                fr.onload = () => {
                    fileToSave.preview = fr.result;
                };
            }
            return fileToSave;
        });
        event.target.value = null; // On remet la valeur a null pour fix un bug lorsque luser add un doc, le supprime, et veut le rajouter
        await dispatch(addFile(mappedFiles, existingFiles));
    };

    return (
        <>
            <ImageButton clickHandler={onCLickHandler}>
                <AttachmentIcon />
            </ImageButton>
            <input
                type="file"
                hidden
                multiple
                ref={inputRef}
                onChange={onChangeHandler}
            />
        </>
    );
};

export default FileInput;
