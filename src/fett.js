let storageKey = "_fettNumInstances";

const numInstances = () => (
  window.localStorage[storageKey] === undefined ? 0 : Number(window.localStorage[storageKey])
)

const decrementInstance = () => {
  if (numInstances() > 0) {
    window.localStorage.setItem(storageKey, numInstances() - 1)
  }
}

const incrementInstance = () => {
  const instances = numInstances()
  window.localStorage.setItem(storageKey, instances + 1)
  // since storage change events only propagate to OTHER windows, manually dispatch
  // a storage change event to the current window (this will only matter onload)
  window.dispatchEvent(new StorageEvent('storage', { key: storageKey, newValue: instances + 1 }))
}

const startCounting = (key) => {
  if (key) storageKey = key;
  window.onbeforeunload = decrementInstance;
  window.onload = incrementInstance;
}

// manually add a listener to localStorage. Useful for on-page-load tracking
const addListener = (listener) => {
  window.addEventListener('storage', listener, true)
}

const removeListener = (listener) => {
  window.removeEventListener('storage', listener, true)
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    numInstances, startCounting, addListener, removeListener
  }
}
