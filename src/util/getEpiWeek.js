const {endOfWeek, isSunday, differenceInCalendarDays, parseISO, subDays, addWeeks, addDays, getMonth, getYear, getDay, format, addSeconds} = require('date-fns');

module.exports = (semana, ano) => {
    const firstDayofYear = new Date(parseInt(ano), 0, 1)

    var firstDay = firstDayofYear;

    if (!isSunday(firstDayofYear)) {
        const firstSundayOfYear = endOfWeek(firstDayofYear, { weekStartsOn: 0 });

        var differenceBetween = differenceInCalendarDays(firstSundayOfYear, firstDayofYear)

        differenceBetween += 1;

        firstDay = firstSundayOfYear;

        if (differenceBetween >= 4) {
            firstDay = subDays(firstSundayOfYear, 7);
        } 
    }

    var firstDayOfEpiWeek = addWeeks(firstDay, semana - 1);

    firstDayOfEpiWeek = addSeconds(firstDayOfEpiWeek, 1)

    // Trata o caso de Semana 53 quando o limite é 52

    if (getYear(firstDayOfEpiWeek) === parseInt(ano) + 1) {
        console.log('Passou do limite!')
    } else {
        var differenceBetween = differenceInCalendarDays(new Date(parseInt(ano), 11, 31), firstDayOfEpiWeek) + 1

        if (differenceBetween < 4) {
            console.log('Passou do limite!')
        }
    }

    var lastDayOfEpiWeek = addDays(firstDayOfEpiWeek, 6);

    lastDayOfEpiWeek = format(lastDayOfEpiWeek, 'yyyy-MM-dd');

    firstDayOfEpiWeek = format(firstDayOfEpiWeek, 'yyyy-MM-dd');

    return [firstDayOfEpiWeek, lastDayOfEpiWeek]
}