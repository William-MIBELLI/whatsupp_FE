export const toFormData = (form) => {
    const formData = new FormData()
    Object.keys(form).forEach(k => {
        formData.append(k, form[k])
    })
    return formData
}