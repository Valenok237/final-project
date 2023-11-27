import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { 
    persistStore,
    persistReducer, 
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import accReducer from './AccSlice';
import docReducer from './DocSlice';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['acc', 'doc']
}

const accpersistConfig = {
  key: 'acc',
  storage,
  whitelist: ['isAuth', 'user']
}

const docpersistConfig = {
  key: 'doc',
  storage,
  blacklist: ['result', 'isLoading', 'search']
}

const rootReducer = combineReducers({
  acc:persistReducer(accpersistConfig, accReducer),
  doc:persistReducer(docpersistConfig, docReducer)
})

const persistedReducer = persistReducer(persistConfig,rootReducer);


export const store = configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
})


export const persistor = persistStore(store);

export type rootState = ReturnType<typeof rootReducer>
export type appStore = ReturnType<typeof store.getState>;
export type appDispath = typeof store.dispatch;