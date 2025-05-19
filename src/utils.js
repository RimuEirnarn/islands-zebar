/**
 * Format to a beautiful float
 * @param {number} x
 * @returns 
 */
function formatNumber(x) {
  if (x.hasOwnProperty('toFixed') || x.toFixed) return x.toFixed(2)
  return x
}

/**
 * Truncate the title depending on the length
 * @param {string} title 
 * @param {number} length 
 * @returns 
 */
function truncate(title, length) {
  return title.length > length ? title.slice(0, length - 3) + '...' : title
}

export { formatNumber, truncate }