import { useEffect, useRef } from "react";
import { Container, MyVideoContainer, PartnerVideoContainer } from "./callBody.style";
import { useSelector } from "react-redux";
import { selectCall } from "../../../store/call/call.selector";

const CallBody = ({ showFooter }) => {

    const myVideo = useRef()
    const partnerVideo = useRef()
    const { partnerStream, myStream } = useSelector(selectCall)


   
    useEffect(() => {
        if (partnerStream) {
            partnerVideo.current.srcObject = partnerStream
        }
        if (myStream) {
            myVideo.current.srcObject = myStream
        }
    },[partnerStream, myStream])


    return (
        <Container>
            <PartnerVideoContainer playsInline ref={partnerVideo} autoPlay muted/>
            <MyVideoContainer playsInline showFooter={showFooter} ref={myVideo} autoPlay muted/>
        </Container>
    )
}

export default CallBody