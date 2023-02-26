export function getCurrentDate(separator = '') {

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${date}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${year}`
}



export function isEligible(value) {
    if (value !== false || value !== null || value !== 0 || value !== "" || value !== undefined) {
        return value;
    }
}