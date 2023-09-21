class DateValidator {
    static validateDay(day) {
        const numericDay = parseInt(day, 10);
        if (isNaN(numericDay) || numericDay < 1 || numericDay > 31) {
            return "Invalid day (1-31)";
        }
        return undefined; // No validation errors
    }

    static validateMonth(month) {
        const numericMonth = parseInt(month, 10);
        if (isNaN(numericMonth) || numericMonth < 1 || numericMonth > 12) {
            return "Invalid month (1-12)";
        }
        return undefined; // No validation errors
    }

    static validateYear(year) {
        const numericYear = parseInt(year, 10);
        if (isNaN(numericYear) || numericYear < 1900 || numericYear > 2099) {
            return "Invalid year (1900-2099)";
        }
        return undefined; // No validation errors
    }

    static validateTime(time) {
        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        if (!timeRegex.test(time)) {
            return "Invalid time format (hh:mm)";
        }
        return undefined; // No validation errors
    }
}

export default DateValidator;
