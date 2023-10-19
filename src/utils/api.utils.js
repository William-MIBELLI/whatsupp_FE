export const toFormData = (form, files = []) => {

    const formData = new FormData()

    Object.keys(form).forEach(k => {
        formData.append(k, form[k])
    })

    // ON RAJOUTE LES FICHIERS JOINTS 
    files.forEach(file => {
        formData.append('files', file.file)
    })

    return formData
}