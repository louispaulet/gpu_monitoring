import React from 'react';
import ReactDOM from 'react-dom/client';
import './output.css'; // Ensure this matches the path to the generated CSS file
import App from './App';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
