import React from 'react';
import ReactDOM from 'react-dom';
import App from './components';
import './scss/style.scss';

const Main: React.FC = () => (
  <App />
);

ReactDOM.render(<Main />, document.getElementById('root'));
