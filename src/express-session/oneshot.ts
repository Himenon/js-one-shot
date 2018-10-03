import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as session from 'express-session';
const app = express();
const sessionStore = new session.MemoryStore();

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
    cookie: { secure: true, maxAge: 36000 },
    store: sessionStore
  })
);

// app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
//   console.log(req.session);
//   if (req.session && !req.session.user) {
//     req.session.user = {};
//   }
//   next();
// });

const sessionCheck = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
};

app.get(
  '/',
  sessionCheck,
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <meta charset="UTF-8">
      <title>Welcome Page</title>
    </head>
    <body>
    <h1>Welcome</h1>
    <p>You Logged in!</p>
    </body>
    </html>
    `);
  }
);

const loginView = (res: express.Response, err?: { message: string }) => {
  res.write(`
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
  </form>`);
  if (err) {
    res.write('<p style="color: red;">' + err.message + '</p>');
  }
  res.write(`</body>
    </html>
  `);
  res.end();
};

app
  .route('/login')
  .get(
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      loginView(res);
    }
  )
  .post(
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      if (req.session && req.body && req.body.userName) {
        req.session.user = { name: req.body.userName };
        res.redirect('/');
      } else {
        loginView(res, { message: '入力が正しくありません。確認して再入力してください。' });
      }
    }
  );

app.listen(3000, () => console.log('Example app listening on port 3000!'));
