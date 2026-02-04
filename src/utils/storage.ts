
/**
 * Stores a key-value pair in the browser's local storage.
 *
 * @param {string} key - The key under which the value will be stored.
 * @param {string} value - The value to be stored.
 * @return {void} This method does not return a value.
 */
export function setStorageItem(key: string, value: string) {
  const storage = window.localStorage
  storage.setItem(key, value)
}

/**
 * Retrieves an item from the local storage by its key.
 *
 * @param {string} key The key of the item to retrieve from local storage.
 * @return {string | null} The value associated with the specified key if it exists, otherwise null.
 */
export function getStorageItem(key: string) {
  const item = window.localStorage.getItem(key)

  return item ? item : null
}

/**
 * Removes the specified item from the browser's local storage.
 *
 * @param {string} key - The key of the storage item to be removed.
 * @return {void} This method does not return a value.
 */
export function removeStorageItem(key: string) {
  const storage = window.localStorage
  storage.removeItem(key)
}