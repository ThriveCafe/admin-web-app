/**
 * This function changes the first letter of a word to uppercase
 * @param {string} [word='']
 * @returns {string}
 */

const capitalizeWord = (word = '') =>
  `${word.charAt(0).toUpperCase()}${word.slice(1)}`

/**
 * This utility function changes the first letter of the first/all words of the input string
 *
 * @param {string} [string='']
 * @param {boolean} [allWords=false]
 * @returns {string}
 */

const capitalize = (string = '', allWords = false) => {
  const words = string.split(' ')

  const capitalizedWords = !allWords
    ? [capitalizeWord(words[0]), ...words.slice(1)]
    : words.map(capitalizeWord)

  return capitalizedWords.join(' ')
}

export default capitalize
