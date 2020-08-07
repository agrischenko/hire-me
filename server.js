const log4js = require('./logger');
const express = require('express');
const path = require('path');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan('dev'));
app.use(log4js.connectLogger(log4js.getLogger('http', {level: 'auto'})));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const router = require('./router');
app.use(router);

app.use(function (req, res, next) {
   next(createError(404));
});

const errlog = log4js.getLogger('errors');

// error handler
app.use(function(err, req, res, next) {
   // set locals, only providing error in development
   res.locals.message = err.message;
   res.locals.error = req.app.get('env') === 'development' ? err : {};

   errlog.error(err);

   // render the error page
   res.status(err.status || 500);
   switch (err.status) {
      case 404:
         res.render('error-404');
         break;
      default:
         res.render('error');
   }
});

app.listen(80, function () {
   console.log(`Started...`);
});

