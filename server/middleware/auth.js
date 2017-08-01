const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const url = require('url');

module.exports.verify = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

let redisSession;
let redisClient;

if (process.env.REDIS_URL) {
  const params = url.parse(process.env.REDIS_URL);
  const auth = params.auth.split(':');
  redisClient = require('redis').createClient(params.port, params.hostname);
  redisClient.auth(params.auth.split(':')[1]);
  redisSession = session({
    store: new RedisStore({
      client: redisClient
    }),
    secret: 'more laughter, more love, more life',
    resave: false,
    saveUninitialized: false
  });
} else {
  redisClient = require('redis').createClient();
  redisSession = session({
    store: new RedisStore({
      client: redisClient,
      host: 'localhost',
      port: 6379
    }),
    secret: 'more laughter, more love, more life',
    resave: false,
    saveUninitialized: false
  });
}

redisClient.on('ready', function() {
  console.log('Redis ready');
}).on('error', function(err) {
  console.log('Redis error', err);
});

module.exports.session = redisSession;
