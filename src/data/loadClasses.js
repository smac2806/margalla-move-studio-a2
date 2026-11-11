import { classes } from './classes.js'

export const FAIL_KEY = 'mm-simulate-fail'
export const EMPTY_KEY = 'mm-simulate-empty'

function readSetting(key) {
  try {
    return window.localStorage.getItem(key) === 'true'
  } catch {
    return false
  }
}

// Mock loader: waits a moment like a real request. The two demo settings come from local storage.
export function loadClasses() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (readSetting(FAIL_KEY)) {
        reject(new Error('The timetable could not be loaded.'))
        return
      }

      if (readSetting(EMPTY_KEY)) {
        resolve([])
        return
      }

      resolve(classes)
    }, 800)
  })
}
