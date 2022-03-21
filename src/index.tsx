import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { setupStore } from "./redux/redux-store";
import { Provider } from "react-redux";

import './index.css';

const store = setupStore()

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);

