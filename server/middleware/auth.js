const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redisClient = require('redis').createClient();
const config = require('config');

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
    url: config.redis.url,
    host: config.redis.host,
    port: config.redis.port
  }),
  secret: 'more laughter, more love, more life',
  resave: false,
  saveUninitialized: false
});
