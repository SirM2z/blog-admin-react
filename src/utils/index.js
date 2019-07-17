import { LOCALDTORAGE_KEY_PREFIX } from '../constant';

// get localStorage
export function getLS (key) {
  const storage = localStorage.getItem(LOCALDTORAGE_KEY_PREFIX + key);
  return JSON.parse(storage);
}

// set localStorage
export function setLS (key, data) {
  localStorage.setItem(LOCALDTORAGE_KEY_PREFIX + key, JSON.stringify(data))
}
