import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { artistsReducer } from '../features/Artists/artistsSlice.ts';
import { albumsReducer } from '../features/Albums/albumsSlice.ts';
import { tracksReducer } from '../features/Tracks/tracksSlice.ts';
import { usersReducer } from '../features/Users/usersSlice.ts';
import storage from "redux-persist/lib/storage"
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, persistStore, persistReducer } from 'redux-persist';
import { tracksHistoryReducer } from '../features/TrackHistory/trackHistorySlice.ts';


const userPersistConfig ={
  key:"store:users",
  storage,
  whitelist:['user']
}

const rootReducer = combineReducers({
  artists: artistsReducer,
  albums: albumsReducer,
  tracks: tracksReducer,
  users:persistReducer(userPersistConfig, usersReducer),
  tracksHistory:tracksHistoryReducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck:{
        ignoredActions:[FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})

// export const store = configureStore({
//   reducer: {
//     users:usersReducer,
//     artists: artistsReducer,
//     albums: albumsReducer,
//     tracks: tracksReducer,
//   },
// });


export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
