export const getFileType = (fileType) => {
    switch (fileType) {
        case 'application/pdf':
            return 'PDF'
        case 'application/msword':
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            return 'DOC'
        case 'video/mpeg':
        case 'video/webm':
            return 'VIDEO'
        case 'application/vnd.oasis.opendocument.text':
        case 'application/rtf':
        case 'text/plain':
            return 'TXT'
        case 'application/vnd.ms-powerpoint':
            return 'PPT'
        case 'application/x-rar-compressed':
        case 'application/zip':
        case 'application/x-7z-compressed':
            return 'ZIP'
        default:
            return 'IMAGE'
    }
}

export const acceptedMimeType = [
    'application/pdf',
    'application/msword',
    'text/plain',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'video/mpeg',
    'video/webm',
    'application/vnd.oasis.opendocument.text',
    'application/rtf',
    'application/vnd.ms-powerpoint',
    'application/x-rar-compressed',
    'application/zip',
    'application/x-7z-compressed',
    'image/jpeg',
    'image/png'
]