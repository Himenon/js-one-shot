import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as session from 'express-session';
const app = express();

app.use(cookieParser());
app.set('trust proxy', 1); // trust first proxy
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  })
);

const sessionCheck = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
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
    if (!req.session) {
      return;
    }
    if (req.session.views && req.session.cookie && req.session.cookie.maxAge) {
      req.session.views++;
      res.setHeader('Content-Type', 'text/html');
      res.write('<p>views: ' + req.session.views + '</p>');
      res.write('<p>expires in: ' + req.session.cookie.maxAge / 1000 + 's</p>');
      res.end();
    } else {
      req.session.views = 1;
      res.end('welcome to the session demo. refresh!');
    }
  }
);

app
  .route('/login')
  .get(
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      res.write('loginページやぞ');
    }
  )
  .post(
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      if (req.session && req.body.userName) {
        req.session.user = { name: req.body.userName };
        res.redirect('/');
      } else {
        res.write('入力が正しくありません。確認して再入力してください。');
      }
    }
  );

app.listen(3000, () => console.log('Example app listening on port 3000!'));
