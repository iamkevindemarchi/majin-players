export function formatDateFromDB(date) {
    if (date) {
        const birthDateSplitted = date.split("-");
        const year = birthDateSplitted[0];
        const month = birthDateSplitted[1];
        const day = birthDateSplitted[2];

        const elabDate = `${day}/${month}/${year}`;
        return elabDate;
    }
}
