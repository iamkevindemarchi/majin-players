export function setToStorage(propLabel, data) {
    const elabData = JSON.stringify(data);

    sessionStorage.setItem(propLabel, elabData);
}

export function getFromStorage(propLabel) {
    const data = sessionStorage.getItem(propLabel);

    return JSON.parse(data);
}

export function removeFromStorage(propLabel) {
    sessionStorage.removeItem(propLabel);
}
