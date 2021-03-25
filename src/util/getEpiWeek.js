const {endOfWeek, isSunday, differenceInCalendarDays, parseISO, subDays, addWeeks, addDays, getMonth, getYear, getDay, format, addSeconds} = require('date-fns');

module.exports = (semana, ano) => {
    const firstDayofYear = new Date(parseInt(ano), 0, 1)
    semana = parseInt(semana);
    ano = parseInt(ano);

    if (semana > 53) {
        return -1;
    }

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
    var lastDayOfEpiWeek = addDays(firstDayOfEpiWeek, 6);

    // Trata o caso de Semana 53 quando o limite é 52

    if (semana === 53) {
        var differenceBetween = differenceInCalendarDays(lastDayOfEpiWeek, new Date(ano + 1, 0, 1)) + 1;
        if (getYear(firstDayOfEpiWeek) === ano + 1) {
            return -1;
        }
        if (getYear(firstDayOfEpiWeek) === ano && getYear(lastDayOfEpiWeek) === ano + 1 && differenceBetween >= 4) {
            return -1;
        }
    }

    lastDayOfEpiWeek = format(lastDayOfEpiWeek, 'yyyy-MM-dd');
    firstDayOfEpiWeek = format(firstDayOfEpiWeek, 'yyyy-MM-dd');

    return [firstDayOfEpiWeek, lastDayOfEpiWeek]
}