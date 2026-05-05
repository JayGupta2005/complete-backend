const express = require('express');
const cookieParesr = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const musicRoutes = require('./routes/music.routes');
const app = express();
app.use(express.json());
app.use(cookieParesr());

app.use('/api/auth', authRoutes);
app.use('/api/music', musicRoutes);

module.exports = app;