// импорт react в TS отличается от привычного import React from 'react' из-за особенностей модульной системы в TS
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';


ReactDOM.render(
    <App  />,
    document.getElementById('root')
);