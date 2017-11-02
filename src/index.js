import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Synth from './components/Synth';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Synth />, document.getElementById('root'));
registerServiceWorker();
