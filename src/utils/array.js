export function sortArrayDescending(years) {
    return years.sort((a, b) => b - a);
}

export function getArrayByDifferentProperty(array, property) {
    const elabArray = array?.map((item) => item[property]);
    const uniqueYears = [...new Set(elabArray)];

    const sortedArray = sortArrayDescending(uniqueYears);

    return sortedArray;
}
