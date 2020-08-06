const express = require('express');
const path = require('path');
const router = require('./router');

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(router);

app.listen(80, function () {
   console.log(`Started...`);
});

