import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './custom.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store'
import { categoryApiSplice } from './redux/category/categoryApiSlice';
import { articleApiSlice } from './redux/article/articleApiSlice'
import Toast from "./components/Toast"

store.dispatch(categoryApiSplice.endpoints.getCategories.initiate())
store.dispatch(articleApiSlice.endpoints.getArticles.initiate())

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Toast />
    </Provider>
  </React.StrictMode>
);
