export const formatPostal = (number) => {
    const numberStr = String(number);
    const formattedNumber = numberStr.slice(0, 2) + "-" + numberStr.slice(2);
    return formattedNumber;
};
