import { configureStore } from '@reduxjs/toolkit'
import { createBlacklistFilter } from 'redux-persist-transform-filter'
import storage from 'redux-persist/lib/storage'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'

import { rootReducer } from './rootReducer'

// исключаем 'showCalc' из сохраняемых
const filter = createBlacklistFilter('testCalc', ['showCalc'])
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['testCalc'],
  transforms: [filter]
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})

export const persistor = persistStore(store)
