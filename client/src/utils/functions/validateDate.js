class DateValidator {
    static validateDate(dateString) {
        const dateParts = dateString.split("-");

        if (dateParts.length !== 3) {
            return "Invalid date format (YYYY-MM-DD)";
        }

        const [year, month, day] = dateParts.map((part) => parseInt(part, 10));

        if (isNaN(year) || isNaN(month) || isNaN(day)) {
            return "Invalid date format (YYYY-MM-DD)";
        }

        if (month < 1 || month > 12) {
            return "Invalid month (1-12)";
        }

        if (day < 1 || day > 31) {
            return "Invalid day (1-31)";
        }

        // Additional date validation logic can be added here if needed

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
