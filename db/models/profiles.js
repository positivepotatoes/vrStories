const db = require('../');

const Profile = db.Model.extend({
  tableName: 'profiles',
  auths: function() {
    return this.hasMany('Auth');
  },
  // stories: function() {
  //   return this.hasMany('Story');
  // },
  stories: function() {
    let currentTime = Date.now();
    let date7DaysAgo = currentTime - 6.048e+8;
    // console.log('this.hasMany(\'Story\'):', this.hasMany('Story').relatedData.target.where);
    // return this.hasMany('Story').relatedData.target.where('created_at', '>', date7DaysAgo);
    // .where({ metadata: 'video/mp4' });
    // console.log('this.hasMany(\'Story\'):', this.hasMany('Story'));
    return this.hasMany('Story');
  },
  friends: function() {
    return this.belongsToMany('Profile', 'friendships', 'profile_id_1', 'profile_id_2' );
  }
});

module.exports = db.model('Profile', Profile);


// new Book({'ISBN-13': '9780440180296'}).fetch({
//   withRelated: [
//     'genre', 'editions',
//     { chapters: function(query) { query.orderBy('chapter_number'); }}
//   ]
// })
