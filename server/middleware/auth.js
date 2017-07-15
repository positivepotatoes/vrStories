const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redisClient = require('redis').createClient();

module.exports.verify = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
  next();
};

module.exports.session = session({
  store: new RedisStore({
    client: redisClient,
    host: process.env.REDIS_URI || 'localhost',
    pass: process.env.REDIS_PASSWORD || '',
    port: process.env.REDIS_PORT || 6379
  }),
  secret: 'more laughter, more love, more life',
  resave: false,
  saveUninitialized: false
});
