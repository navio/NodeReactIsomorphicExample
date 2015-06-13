import express from 'express';
import path from 'path';
import _ from 'lodash';
import fs from 'fs';
import React from 'react';
import App from './components/app/app';

const server = express();

server.set('port', (process.env.PORT || 8080));

const templateFile = path.join(__dirname, '/index.html');
const template = _.template(fs.readFileSync(templateFile, 'utf8'));

let app =<App />;
let data = {};
data.body = data.body = React.renderToString(app);

let html = template(data);

server.get('/app.js', (req, res) => res.send(fs.readFileSync(path.join(__dirname, '/app.js'),'utf8')) );

server.get('*', (req, res) => res.send(html) );

server.listen(server.get('port'));
