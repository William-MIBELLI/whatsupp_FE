import moment from "moment";

export const createAction = (type, payload = undefined) => {
  return { type, payload };
};

export const handleDate = (date) => {
  const now = moment()
  const momentDate = moment(date)
  const time = momentDate.fromNow()
  const dateByHourAndMin = momentDate.format('HH:mm')

  const getDay = () => {
    const days = time.split(' ')[0]
    if (+days < 8) {
      return now.subtract(+days, 'days').format('dddd')
    }
    return momentDate.format('DD/MM/YYYY')
  }

  if (time === 'a few seconds') return 'Now'

  if (time.search('minute') !== -1) {
    const mins = time.split(' ')[0]
    if (mins === 'a') {
      return '1 min'
    }
    return `${mins} min`
  }

  if (time.search('hour') !== -1) return dateByHourAndMin

  if(time === 'a day ago') return 'Yesterday'
    
  if (time.search('days') !== -1) return getDay
  
  return time
}

export const parsePictureUrl = (pictureUrl) => {
  const mappedPicUrl = `${process.env.REACT_APP_API_ENDPOINT}/${pictureUrl}`
  console.log('mappedpicture dans utils : ', mappedPicUrl)
  return mappedPicUrl
}