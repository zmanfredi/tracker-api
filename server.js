require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const { connectToDb } = require('./db.js');
const { installHandler } = require('./api_handler.js');

const port = process.env.PORT || 3000;
const auth = require('./auth.js');

const app = express();
app.use(cookieParser());
app.use('/auth', auth.routes);

installHandler(app);

(async function start() {
  try {
    await connectToDb();
    app.listen(port, () => {
      console.log(`API server started on port ${port}`);
    });
  } catch (err) {
    console.log('ERROR:', err);
  }
}());
