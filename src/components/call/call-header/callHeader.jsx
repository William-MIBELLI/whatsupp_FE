import { useSelector } from "react-redux";
import { Container, Title } from "./callheader.style";
import { useContext, useEffect, useState } from "react";
import { selectCall } from "../../../store/call/call.selector";
import PrimaryText from "../../primary-text/primaryText";
import SecondaryText from "../../secondary-text/secondaryText";
import { formatCallDuration } from "../../../utils/helper";
import { CallContext } from "../../../routes/home/home";

const CallHeader = () => {

    const [timer, setTimer] = useState(0)
    const { isActive, isAccepted } = useSelector(selectCall)
    const { onDeclineCall } = useContext(CallContext)

    //Compte la durée de l'appel
    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(time => time + 1)
        }, 1000)
        if (!isActive) {
            return clearInterval(interval)  
        }
    },[])
    

    //Cut l'appel si pas de réponse
    useEffect(() => {
        if (timer >= 200 && !isAccepted) {
            onDeclineCall()
        }
    }, [timer])
    

    return (
        <Container>
            <Title>
                {
                    !isAccepted ? (
                        <PrimaryText>Is ringing ...</PrimaryText>
                    ) : (
                            <>
                                <PrimaryText>Call timer :</PrimaryText>
                                <SecondaryText>{formatCallDuration(timer)}</SecondaryText>
                            </>
                    )
                }
            </Title>
        </Container>
    )
}

export default CallHeader