import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/lib/storage';

import rootReducer from './reducers';
import sagas from './sagas';

const persistConfig = {
  key: 'aamt',
  storage,
  whitelist: [ 'usuario', 'appConfig', 'definirRotaCache', 'vistoriaCache', 'rotaCache' ]
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer( persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  composeEnhancers( applyMiddleware( sagaMiddleware ) )
);

const persistor = persistStore( store );

sagaMiddleware.run( sagas );

export { store, persistor };
