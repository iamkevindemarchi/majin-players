const APP_WEBSITE = process.env.REACT_APP_WEBSITE;

export function setToStorage(propLabel, data) {
    const elabData = JSON.stringify(data);
    const elabPropLabel = `${APP_WEBSITE}-${propLabel}`;

    sessionStorage.setItem(elabPropLabel, elabData);
}

export function getFromStorage(propLabel) {
    const elabPropLabel = `${APP_WEBSITE}-${propLabel}`;
    const data = sessionStorage.getItem(elabPropLabel);

    return JSON.parse(data);
}

export function removeFromStorage(propLabel) {
    const elabPropLabel = `${APP_WEBSITE}-${propLabel}`;
    sessionStorage.removeItem(elabPropLabel);
}
