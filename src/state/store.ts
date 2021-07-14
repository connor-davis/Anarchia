import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";

import { Storage as IonicStorage } from "@ionic/storage";
import { userSlice } from "./slices/user.slice";

let ionicStorage = new IonicStorage();

ionicStorage.create();

class SelfStorage {
  constructor() {
    this.getItem = this.getItem.bind(this);
    this.setItem = this.setItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.clear = this.clear.bind(this);
  }

  getItem(key: string): any {
    return ionicStorage.get(key);
  }

  setItem(key: string, value: any) {
    ionicStorage.set(key, value);
  }

  removeItem(key: string) {
    ionicStorage.remove(key);
  }

  clear() {
    ionicStorage.clear();
  }
}

let storage = new SelfStorage();

let persistConfig = {
  key: "root",
  storage,
};

function loggerMiddleware(store: any) {
  return function (next: any) {
    return function (action: any) {
      console.log(action);
      next(action);
      console.log(store.getState());
    };
  };
}

let userReducer = userSlice.reducer;

let rootReducer = combineReducers({
  userReducer,
});

let persistedReducer = persistReducer(persistConfig, rootReducer);

let store = configureStore({
  reducer: persistedReducer,
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
    loggerMiddleware,
  ],
});

let persistor = persistStore(store);

export { store, persistor };
