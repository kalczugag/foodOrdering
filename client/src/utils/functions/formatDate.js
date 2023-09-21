import _ from "lodash";

class DateUtils {
    static formatTimestamp(inputDateString) {
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
    }

    static formatDate(day, month, year) {
        const date = new Date(year, month - 1, day);
        const options = { day: "numeric", month: "long", year: "numeric" };
        const formattedDate = date.toLocaleDateString("en-US", options);

        const [formattedMonth, formattedDay, formattedYear] =
            formattedDate.split(" ");

        return {
            day: formattedDay,
            month: formattedMonth,
            year: formattedYear,
        };
    }

    static formatDateFromMongoDB(timestamp) {
        const date = new Date(timestamp);

        const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];

        const month = monthNames[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();

        const formattedDate = `${month} ${day
            .toString()
            .padStart(2, "0")}, ${year}`;

        return formattedDate;
    }
}

export default DateUtils;
