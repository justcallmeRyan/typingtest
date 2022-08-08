import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
import userReducer from "./userSlice"
import startReducer from "./startSlice"
import wordReducer from "./wordSlice"
import languageReducer from "./languageSlice"
import resultReducer from "./resultSlice"

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}


const rootReducer = combineReducers({
    user: userReducer,
    start: startReducer,
    word: wordReducer,
    language: languageReducer,
    result: resultReducer,
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})
export const persistor = persistStore(store)

// export default configureStore({
//     reducer: {
//
//         user: userReducer,
//         start: startReducer,
//         word: wordReducer,
//         language: languageReducer,
//         result: resultReducer,
//     }
// })