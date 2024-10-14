export function checkRequiredField(field) {
    let isFieldValid;

    if (field) {
        const isFieldObject = typeof field === "object";

        if (isFieldObject) isFieldValid = true;
        else isFieldValid = field.trim() !== "" ? true : false;
    }

    return isFieldValid;
}

export function checkEmail(email) {
    // eslint-disable-next-line
    const EMAIL_REG_EXP = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    const isEmailEmpty = !checkRequiredField(email);

    if (isEmailEmpty) return { value: false, message: "Campo obbligatorio*" };

    if (!EMAIL_REG_EXP.test(email))
        return { value: false, message: "E-mail non valida" };

    return { value: true, message: "" };
}

export function checkYear(year) {
    const elabYear = parseInt(year);
    const currentYear = new Date().getFullYear();

    const isYearValid = elabYear >= 1900 && elabYear <= currentYear - 10;

    return isYearValid;
}

export function checkTopYear(year) {
    const birthYear = 1996;
    const elabYear = parseInt(year);
    const isYearEmpty = !checkRequiredField(year);
    const currentYear = new Date().getFullYear();

    if (isYearEmpty) return { value: false, message: "Campo obbligatorio*" };

    if (elabYear < birthYear || elabYear > currentYear)
        return { value: false, message: "Anno non valido" };

    return { value: true, message: "" };
}
