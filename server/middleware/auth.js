const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const config = require('config');
const redis = require('redis');

module.exports.verify = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
  next();
};

if (process.env.REDIS_URL) {
  let redisClient = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);
  redisClient.auth(process.env.REDIS_PASSWORD);
  module.exports.session = session({
    store: new RedisStore({
      client: redisClient
    }),
    secret: 'more laughter, more love, more life',
    resave: false,
    saveUninitialized: false
  });
} else {
  module.exports.session = session({
    store: new RedisStore({
      client: redis.createClient(),
      url: config.redis.url,
      host: config.redis.host,
      port: config.redis.port
    }),
    secret: 'more laughter, more love, more life',
    resave: false,
    saveUninitialized: false
  });
}