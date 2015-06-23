import React from 'react';
import FastClick from 'fastclick';
import App from './components/app/app'

new Promise((resolve) => {
    if (window.addEventListener) {
      window.addEventListener('DOMContentLoaded', resolve);
    } else {
      window.attachEvent('onload', resolve);
    }
  }).then(run)

let path = decodeURI(window.location.pathname);

function run(){

  let element = React.createElement(App, { path : path });
  
  React.render(element, document.getElementById('app'));

}
