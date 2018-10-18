import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import * as url from 'url';
import { Html } from './base';
import { App } from './oneshot';

const app = express();
const dirname = process.cwd();

app.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  ReactDOMServer.renderToNodeStream(<Html><App /></Html>).pipe(res);
});

app.get('/lib/*.js', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { pathname } = url.parse(req.url)
  if (!pathname) {
    return
  }
  const filePath = path.join(dirname, pathname)
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    fs.createReadStream(filePath).pipe(res)
    return
  }
  const data = fs.readFileSync(filePath);
  res.send(data);
});

app.listen(3500);
