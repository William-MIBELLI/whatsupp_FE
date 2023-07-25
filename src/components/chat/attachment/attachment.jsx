import {
    CameraIcon,
    ContactIcon,
    DocumentIcon,
    PhotoIcon,
    PollIcon,
    StickerIcon,
} from "../../../svg";
import { theme } from "../../../utils/theme";
import ImageButton from "../../image-button/imageButton";
import { Component } from "./attachement.style";

const Attachment = () => {
    
    const color = theme.color;
    const size = "50px";

    return (
        <Component>
            <li>
                <ImageButton size={size} padding={0}>
                    <PollIcon />
                </ImageButton>
            </li>
            <li>
                <ImageButton size={size} bg={color.contact_icon} padding={0}>
                    <ContactIcon />
                </ImageButton>
            </li>
            <li>
                <ImageButton size={size} bg={color.document_icon} padding={0}>
                    <DocumentIcon />
                </ImageButton>
            </li>
            <li>
                <ImageButton size={size} bg={color.camera_icon} padding={0}>
                    <CameraIcon />
                </ImageButton>
            </li>
            <li>
                <ImageButton size={size} padding={0}>
                    <StickerIcon />
                </ImageButton>
            </li>
            <li>
                <ImageButton size={size} bg={color.photo_icon} padding={0}>
                    <PhotoIcon />
                </ImageButton>
            </li>
        </Component>
    );
};

export default Attachment;
