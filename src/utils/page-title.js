export function setPageTitle(title) {
    const elabTitle = `${process.env.REACT_APP_WEBSITE_NAME} - ${title}`;

    document.title = elabTitle;
}
