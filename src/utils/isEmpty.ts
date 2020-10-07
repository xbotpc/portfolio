/**
 * Returns true if value is empty or undefined or null or zero
 * @param {number | string} value
 */
const isEmpty = (value: string | number | Object | undefined | null) => value === '' || value === undefined || value === null || value === 0;

export default isEmpty;
