import { useEffect, useState } from 'react'

function readStorage(key, fallback) {
  try {
    const saved = window.localStorage.getItem(key)
    return saved === null ? fallback : JSON.parse(saved)
  } catch {
    return fallback
  }
}

// Works like useState, but the value is restored from and saved to local storage.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => readStorage(key, initialValue))

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // storage can be blocked (private mode); the app still works without it
    }
  }, [key, value])

  return [value, setValue]
}
