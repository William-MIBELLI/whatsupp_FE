import { useEffect, useRef, useState } from "react";
import { Container, MyVideoContainer, UserVideoContainer } from "./callBody.style";

const CallBody = ({ showFooter }) => {

    const myVideo = useRef()
    const userVideo = useRef()
    const [stream, setStream] = useState(null)


    //On call setupMedia au montage du composant
    useEffect(() => {
        console.log('useffect de setpudmedia')
        setupMedia()
    },[])
    
    //On passe le stream en src quand on la recup
    useEffect(() => {
        console.log('useffect de srcobject ', myVideo, stream)
        myVideo.current.srcObject = stream
    },[stream])
    
    //Récupérer la webcam et le micro de l'user
    const setupMedia = async () => {
        const st = await navigator.mediaDevices.getUserMedia({
            video: true,
        })
        setStream(st)
    }


    return (
        <Container>
            <UserVideoContainer>
            </UserVideoContainer>
            <MyVideoContainer showFooter={showFooter} ref={myVideo} autoPlay/>
        </Container>
    )
}

export default CallBody