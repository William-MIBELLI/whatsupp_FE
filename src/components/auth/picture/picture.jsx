import { useRef, useState } from "react";
import { StyledPicture, PreviewImg, PreviewContainer, RemoveButton } from "./picture.style";

const Picture = ({ setPicture }) => {
    //const [picture, setPicture] = useState();
    const [previewPic, setPreviewPic] = useState()
    const [error, setError] = useState(null)
    const inputRef = useRef();

    const onClickHandler = () => {
        inputRef.current.click();
    };

    const onChangeHandler = async (event) => {
        const pic = event.target.files[0]
        if (pic.type !== 'image/png' && pic.type !== 'image/webp' && pic.type !== 'image/jpeg') {
            setError('Picture have to be .png, .webp or .jpg')
            return
        }
        if (pic.size > 1024 * 1024 * 5) {
            setError('Picture\'s size must be under 5 Mb')
            return
        }
        setError(null)
        setPicture(pic)
        const reader = new FileReader()
        reader.readAsDataURL(pic)
        reader.onload = () => {
            setPreviewPic(reader.result)
        }
    }

    const onRemoveHandler = () => {
        setPicture(null)
        setPreviewPic(null)
    }

    return (
        <>
            <StyledPicture onClick={onClickHandler}>
                Select Profile picture
            </StyledPicture>
            {
                error && (
                    <p>{error}</p>
                )
            }
            {
                previewPic && (
                    <PreviewContainer>
                        <PreviewImg src={previewPic} alt='profilePreview' />
                        <RemoveButton text={'Remove'} type={'button'} clickHandler={onRemoveHandler}/>
                    </PreviewContainer>
                )
            }
            <input
                onChange={onChangeHandler}
                type="file"
                name="pictureInput"
                ref={inputRef}
                hidden
                accept="image/png,image/webp,image/jpeg"
            />
        </>
    );
};

export default Picture;
