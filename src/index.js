import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MusicScore from "./MusicScore";
import * as serviceWorker from './serviceWorker';

function selectionCallback(selection) {
    console.debug("some items have been selected");
    console.debug(selection);
}

ReactDOM.render(<MusicScore scoreURL="/Beethoven_WoO80-32-Variationen-c-Moll.mei" selectionCallback={selectionCallback} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
