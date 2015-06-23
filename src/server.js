import express from 'express';
import path from 'path';
import _ from 'lodash';
import fs from 'fs';
import React from 'react';
import App from './components/app/app';

const server = express();

server.set('port', (process.env.PORT || 8080));


server.get('/app.js', (req, res) => res.send(fs.readFileSync(path.join(__dirname, '/app.js'),'utf8')) );
//app.use(express.static('public'));
//server.get('*', (req, res) => res.send(html) );

const templateFile = path.join(__dirname, '/index.html');
const template = _.template(fs.readFileSync(templateFile, 'utf8'));

server.use( (req, res) => {

  let app =<App path={req.path} />;
  let data = {};
  data.body = data.body = React.renderToString(app);
  let html = template(data);
  res.send(html)

});


server.listen(server.get('port'), () => {
  if (process.send) {
    process.send('online');
  } else {
    console.log('The server is running at http://localhost:' + server.get('port'));
  }
});
