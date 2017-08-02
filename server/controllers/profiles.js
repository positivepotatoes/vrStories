const models = require('../../db/models');

module.exports.getFriends = (req, res) => {
  debugger;
  let currentTime = Date.now();
  let date7DaysAgo = (currentTime - 6.048e+8).toString();
  models.Profile.where({ id: req.params.id })
    .fetchAll({ withRelated: ['friends', 'friends.stories', { 'friends.stories': function(query) { query.where('created_at', '>', date7DaysAgo); } }, 'stories' ] })
    .then((response) => {
      console.log('RESPONSE:', response);
      if (!response) {
        throw response;
      }
      let friendList = response.toJSON()[0];
      let userStories = [];
      friendList.stories.forEach((story) => {
        userStories.push({ 'type': story.metadata, 'src': story.aws_link, 'uploadId': story.profile_id, 'storyDBId': story.id });
      });
      let user = {
        uploadId: friendList.id,
        first: friendList.first,
        last: friendList.last,
        displayName: friendList.first,
        img_url: friendList.img_url,
        stories: userStories
      };
      let friends = [];
      friendList.friends.forEach((profile) => {
        let stories = [];
        profile.stories.forEach((story) => {
          stories.push({ 'type': story.metadata, 'src': story.aws_link, 'storyDBId': story.id });
        });
        friends.push({ 'first': profile.first, 'last': profile.last, 'displayName': profile.first, 'img_url': profile.img_url, 'stories': stories });
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


// { stories: function(query) { query.where('created_at', '>', date7DaysAgo) } }
