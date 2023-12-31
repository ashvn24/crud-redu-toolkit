import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import persistedReducer from './Datastore';


const store = configureStore({
  reducer: {persistedReducer},
});

const persistor = persistStore(store);

export { store, persistor };
