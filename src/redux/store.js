import { createStore } from 'redux'
import tokenReducer from './reducers'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, tokenReducer);
let store = createStore(persistedReducer);
let persistor = persistStore(store);

export { store, persistor }
