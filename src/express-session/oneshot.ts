import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as session from 'express-session';
import * as http from 'http';
import * as portfinder from 'portfinder';

const app = express();
const sessionStore = new session.MemoryStore();
let server: http.Server;

interface OneShotSession extends Express.Session {
  userName: string;
}

app.set('trust proxy', 1); // trust first proxy
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    name : 'app.sid',
    secret: 'keyboard cat2',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 36000 }, // when local -> secure: false
    store: sessionStore
  })
);

const sessionCheck = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.session && req.session.userName) {
    next();
  } else {
    res.redirect('/login');
  }
};

app.get(
  '/',
  sessionCheck,
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const localSession = req.session as OneShotSession;
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <meta charset="UTF-8">
      <title>Welcome Page</title>
    </head>
    <body>
    <h1>Welcome ${localSession.userName}</h1>
    <p>You Logged in!</p>
    <a href="/logout">Logout</a>
    </body>
    </html>
    `);
  }
);

export const getLoginViewContent = (err?: { message: string }): string => {
  let result = `
  <!DOCTYPE html>
  <html lang="en">
    <meta charset="UTF-8">
    <title>Login Page</title>
  </head>
  <body>
  <h1>Login</h1>
  <form method="POST" action="/login">
    <input type="text" name="userName" placeholder="username">
    <input type="submit" value="login">
  </form>`;
  if (err) {
    result += '<p style="color: red;">' + err.message + '</p>';
  }
  result += `</body>
    </html>
  `;
  return result;
};

app
  .route('/login')
  .get(
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      res.write(getLoginViewContent());
      res.end();
    }
  )
  .post(
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      if (req.session && req.body && req.body.userName) {
        req.session.userName = req.body.userName;
        req.session.save(() => {
          res.redirect('/');
        });
      } else {
        res.write(getLoginViewContent({ message: '入力が正しくありません。確認して再入力してください。' }));
        res.end();
      }
    }
  );

app.route('/logout')
   .get(
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      if (req.session) {
        req.session.destroy(() => undefined);
      }
      res.redirect('/login');
    }
  );

portfinder.getPort({ port: 3000 }, (error: any, port: number) => {
  server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});

export {
  app,
  server,
};
