'use strict';
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('config')['passport'];
const models = require('../../db/models');

passport.serializeUser((profile, done) => {
  done(null, profile.id);
});

passport.deserializeUser((id, done) => {
  return models.Profile.where({ id }).fetch()
    .then(profile => {
      if (!profile) {
        throw profile;
      }
      done(null, profile.serialize());
    })
    .error(error => {
      done(error, null);
    })
    .catch(() => {
      done(null, null, { message: 'No user found' });
    });
});

passport.use('facebook', new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID || config.Facebook.clientID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET || config.Facebook.clientSecret,
  callbackURL: '/auth/facebook/callback',
  profileFields: ['id', 'emails', 'name', 'friends', 'picture.type(large)']
},
(accessToken, refreshToken, profile, done) => {
  getOrCreateOAuthProfile('facebook', profile, done)
    .then(() => makeFriendList(profile));
}));

const makeFriendList = (profile) => {
  const friendList = profile._json.friends.data;
  var userId;
  models.Profile.where({ facebook_id: profile.id }).fetch()
    .then((user) => {
      // profile id for current user
      return user.id;
    }).then((userId) => {
      // for each friend, check the sql server to see if the friend exists
      friendList.forEach((friend) => {
        let friendId;
        // for each friend, get the profile id
        models.Profile.where({ facebook_id: friend.id }).fetch()
          .then((profile) => {
            friendId = profile.id;
            // check if the friendship already exists
            models.Friendship.where({ profile_id_1: userId, profile_id_2: friendId }).fetch()
              .then((searchResult) => {
                // if it doesn't, forge and save
                if (searchResult === null) {
                  models.Friendship.forge({ profile_id_1: userId, profile_id_2: friendId }).save();
                }
              });
          })
          .catch((err) => console.log('Error inside foreach loop of makeFriendList', err));
      });
    })
    .catch((err) => console.log('Error in makefriendlist', err));
};

const getOrCreateOAuthProfile = (type, oauthProfile, done) => {
  return models.Auth.where({ type, oauth_id: oauthProfile.id }).fetch({
    withRelated: ['profile']
  })
    .then(oauthAccount => {
      if (oauthAccount) {
        throw oauthAccount;
      }

      if (!oauthProfile.emails || !oauthProfile.emails.length) {
        // FB users can register with a phone number, which is not exposed by Passport
        throw null;
      }
      return models.Profile.where({ email: oauthProfile.emails[0].value }).fetch();
    })
    .then(profile => {

      let profileInfo = {
        first: oauthProfile.name.givenName,
        last: oauthProfile.name.familyName,
        display: oauthProfile.displayName || `${oauthProfile.name.givenName} ${oauthProfile.name.familyName}`,
        email: oauthProfile.emails[0].value,
        facebook_id: oauthProfile.id,
        img_url: oauthProfile.photos[0].value
      };

      if (profile) {
        //update profile with info from oauth
        return profile.save(profileInfo, { method: 'update' });
      }
      // otherwise create new profile
      return models.Profile.forge(profileInfo).save();
    })
    .tap(profile => {
      return models.Auth.forge({
        type,
        profile_id: profile.get('id'),
        oauth_id: oauthProfile.id
      }).save();
    })
    .error(err => {
      done(err, null);
    })
    .catch(oauthAccount => {
      if (!oauthAccount) {
        throw oauthAccount;
      }
      return oauthAccount.related('profile');
    })
    .then(profile => {
      if (profile) {
        done(null, profile.serialize());
      }
    })
    .catch(() => {
      done(null, null, {
        'message': 'Signing up requires an email address, \
          please be sure there is an email address associated with your Facebook account \
          and grant access when you register.' });
    });
};

module.exports = passport;
