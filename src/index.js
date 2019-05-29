import React from 'react'
import ReactDOM from 'react-dom'

import { PersistGate } from 'redux-persist/integration/react'

import { Provider } from 'react-redux'
import configureStore from './store'

import App from './App'

const { persistor, store } = configureStore()

const rootElement = document.getElementById('root')
ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
    rootElement
);
