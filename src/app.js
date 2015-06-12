import React from 'react';
import App from './components/app'

let app = <App
      path={req.path}
      context={{
        onInsertCss: value => css.push(value),
        onSetTitle: value => data.title = value,
        onSetMeta: (key, value) => data[key] = value,
        onPageNotFound: () => notFound = true
      }} />;


function run() {

  let element = React.createElement(App, {});

  React.render(element, document.getElementById('app'));
}

run();
