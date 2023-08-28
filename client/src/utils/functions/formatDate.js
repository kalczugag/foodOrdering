import _ from "lodash";

export const formatDate = (inputDateString) => {
    return _.chain(new Date(inputDateString))
        .thru((date) => ({
            year: date.getFullYear(),
            month: String(date.getMonth() + 1).padStart(2, "0"),
            day: String(date.getDate()).padStart(2, "0"),
            hours: String(date.getHours()).padStart(2, "0"),
            minutes: String(date.getMinutes()).padStart(2, "0"),
            seconds: String(date.getSeconds()).padStart(2, "0"),
        }))
        .thru(
            ({ year, month, day, hours, minutes, seconds }) =>
                `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
        )
        .value();
};
