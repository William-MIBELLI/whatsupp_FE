
//Recupérer la caméra et l'audio de l'utilisateur
export const getMedia = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    return stream
}