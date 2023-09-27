import { useState, useEffect } from 'react'
import { getStorageValue, setStorageValue } from '@shared/lib/utils/index.js'

export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue)
  })

  useEffect(() => {
    setStorageValue(key, value)
  }, [key, value])

  return [value, setValue]
}
