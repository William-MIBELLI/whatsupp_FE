import moment from "moment";
import { loginUserOnServer } from "../service/api.service";

export const createAction = (type, payload = undefined) => {
    return { type, payload };
};

export const handleDate = (date) => {
    const now = moment();
    const momentDate = moment(date);
    const time = momentDate.fromNow();
    const dateByHourAndMin = momentDate.format("HH:mm");

    const getDay = () => {
        const days = time.split(" ")[0];
        if (+days < 8) {
            return now.subtract(+days, "days").format("dddd");
        }
        return momentDate.format("DD/MM/YYYY");
    };

    if (time === "a few seconds ago") return "Now";

    if (time.search("minute") !== -1) {
        const mins = time.split(" ")[0];
        if (mins === "a") {
            return "1 min";
        }
        return `${mins} min`;
    }

    if (time.search("hour") !== -1) return dateByHourAndMin;

    if (time === "a day ago") return "Yesterday";

    if (time.search("days") !== -1) return getDay();

    return time;
};

export const parsePictureUrl = (pictureUrl) => {
    const mappedPicUrl = `${process.env.REACT_APP_API_ENDPOINT}/${pictureUrl}`;

    return mappedPicUrl;
};

export const getReceiverId = (users, userId) => {
    if (users.length <= 1) { //Sécurité si la conversation ne contient quun seul user
        return users[0]?._id
    }
    if (users[0]._id === userId) {
        return users[1]._id;
    }
    return users[0]._id;
};

//Return l'user de la conversation
export const getSender = (convo, userId) => {
    const { users } = convo;
    if (users.length <= 1) { //Sécurité si la convo ne contient quun seul user
        return users[0]
    }
    if (users[0]._id === userId) {
        return users[1];
    }
    return users[0];
};

//Return le timer du call dans le format 00:00
export const formatCallDuration = (timer) => {
    const minutes = (parseInt(timer) / 60).toString().split('.')[0].padStart(2, '0')
    const seconds = (parseInt(timer) % 60).toString().padStart(2, '0')
    return `${minutes}:${seconds}`
}
