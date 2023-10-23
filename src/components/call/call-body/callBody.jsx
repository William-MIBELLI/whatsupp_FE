import { useEffect, useRef, useState } from "react";
import { Container, MyVideoContainer, PartnerVideoContainer } from "./callBody.style";
import { useDispatch, useSelector } from "react-redux";
import { getStream } from "../../../store/call/call.action";
import { selectCall } from "../../../store/call/call.selector";

const CallBody = ({ showFooter }) => {

    const myVideo = useRef()
    const partnerVideo = useRef()
    const [stream, setStream] = useState(null)
    const dispatch = useDispatch()
    const { partnerStream, myStream } = useSelector(selectCall)


   
    useEffect(() => {
        console.log('useeffect dans call body : ')
        if (partnerStream) {
            console.log('partnerstream :  ', partnerStream)
            partnerVideo.current.srcObject = partnerStream
        }
        if (myStream) {
            console.log('mystream ', myStream)
            myVideo.current.srcObject = myStream
        }
    },[partnerStream, myStream])


    return (
        <Container>
            <PartnerVideoContainer playsInline ref={partnerVideo} autoPlay/>
            <MyVideoContainer playsInline showFooter={showFooter} ref={myVideo} autoPlay/>
        </Container>
    )
}

export default CallBody