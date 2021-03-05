import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
// import "bootstrap/dist/css/bootstrap.min.css"
import Compose  from './contexts/Compose'
import { AuthProvider } from './contexts/AuthContext';
import { PostProvider } from './contexts/PostContext';
import { CategoryProvider } from './contexts/CategoryContext';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Compose components={[AuthProvider, PostProvider, CategoryProvider]}>
    <App />
    </Compose>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

