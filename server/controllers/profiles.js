const models = require('../../db/models');

module.exports.getAll = (req, res) => {
  models.Profile.fetchAll()
    .then(profiles => {
      res.status(200).send(profiles);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
};

// module.exports.create = (req, res) => {
//   models.Profile.forge({ username: req.body.username, password: req.body.password })
//     .save()
//     .then(result => {
//       res.status(201).send(result.omit('password'));
//     })
//     .catch(err => {
//       if (err.constraint === 'users_username_unique') {
//         return res.status(403);
//       }
//       res.status(500).send(err);
//     });
// };

module.exports.getOne = (req, res) => {
  models.Profile.where({ id: req.params.id }).fetch()
    .then(profile => {
      if (!profile) {
        throw profile;
      }
      res.status(200).send(profile);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

module.exports.update = (req, res) => {
  models.Profile.where({ id: req.params.id }).fetch()
    .then(profile => {
      if (!profile) {
        throw profile;
      }
      return profile.save(req.body, { method: 'update' });
    })
    .then(() => {
      res.sendStatus(201);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

// module.exports.deleteOne = (req, res) => {
//   models.Profile.where({ id: req.params.id }).fetch()
//     .then(profile => {
//       if (!profile) {
//         throw profile;
//       }
//       return profile.destroy();
//     })
//     .then(() => {
//       res.sendStatus(200);
//     })
//     .error(err => {
//       res.status(503).send(err);
//     })
//     .catch(() => {
//       res.sendStatus(404);
//     });
// };

module.exports.getFriends = (req, res) => {
  console.log(`AYE COREY, MAKE A DB QUERY TO GET FRIENDS FOR PERSON WITH ID ${req.params.id}`);
  // this is on the profile model
  // so do something inside the pofile schema to get all the friends related to a user
  models.Profile.where({ id: req.params.id })
    .fetchAll({ withRelated: ['friends', 'friends.stories', 'stories'] })
    .then((response) => {
      if (!response) {
        throw response;
      }
      let friendList = response.toJSON()[0];
      let userStories = [];
      friendList.stories.forEach((story) => {
        userStories.push({ 'type': story.metadata, 'src': story.aws_link });
      });
      let user = {
        profile: {
          uploadId: friendList.id,
          first: friendList.first,
          last: friendList.last,
          display: friendList.display,
          img_url: friendList.img_url
        },
        stories: userStories
      };
      let friends = [];
      friendList.friends.forEach((profile) => {
        let stories = [];
        profile.stories.forEach((story) => {
          stories.push({ 'type': story.metadata, 'src': story.aws_link });
        });
        friends.push({ 'profile': { 'first': profile.first, 'last': profile.last, 'display': profile.display, 'img_url': profile.img_url }, 'stories': stories });
      });
      let send = { 'user': user, 'friends': friends, 'profile_id': friendList.id };
      res.status(200).send(send);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};
