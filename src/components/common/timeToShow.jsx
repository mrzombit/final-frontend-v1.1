
function timeToShow(type, date) {
    if (typeof (date) === 'string') {
        const year = date.slice(0, 4)
        const month = date.slice(5, 7)
        const day = date.slice(8, 10)
        if (type === "input-date") {
            return `${year}-${month}-${day}`
        }
        console.log(date);
    } else {
        console.log('this date is not a string');
        console.log(date);
    }

}

export default timeToShow