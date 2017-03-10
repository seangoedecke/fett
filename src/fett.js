var storageKey = "_fettNumInstances";

function numInstances() {
  if (window.localStorage[storageKey] === undefined) {
    return 0
  } else {
    return Number(window.localStorage[storageKey])
  }
}

function decrementInstance() {
  if (numInstances() > 0) {
    window.localStorage.setItem(storageKey, numInstances() - 1)
  }
}

function incrementInstance() {
  var instances = numInstances()
  window.localStorage.setItem(storageKey, instances + 1)
  // since storage change events only propagate to OTHER windows, manually dispatch
  // a storage change event to the current window (this will only matter onload)
  window.dispatchEvent(new StorageEvent('storage', { key: storageKey, newValue: instances + 1 }))
}

function startCounting(key) {
  if (key) {
    storageKey = key;
  }
  window.onbeforeunload = decrementInstance;
  window.onload = incrementInstance;
}

function addListener(listener) {
  window.addEventListener('storage', listener, true)
}

function removeListener(listener) {
  window.removeEventListener('storage', listener, true)
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    numInstances: numInstances,
    startCounting: startCounting,
    addListener: addListener,
    removeListener: removeListener
  }
}
