function capitalizeFirstLetter(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

function trimString(value: string, maxLength: number) {
    value = value.substring(0, maxLength);
    return value.substring(0, Math.min(value.length, value.lastIndexOf(' ')));
}

export { capitalizeFirstLetter, trimString };