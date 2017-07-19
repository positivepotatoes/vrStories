
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('profiles').del()
    .then(function () {
      // Inserts seed entries
      return knex('profiles').insert([
        {id: 1, first: 'David', last: 'Oh', display: 'David Oh', email: 'joonoh89@gmail.com', facebook_id: '1967814096834148', img_url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/10354249_1579727838976111_1084644407629526862_n.jpg?oh=a85997391a2a5dfb86d8759dec9d51bc&oe=59FAF06F'},
        {id: 2, first: 'Anna', last: 'Zharkova', display: 'Anna Zharkova', email: 'annagzh@gmail.com', facebook_id: '1745835092094122', img_url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/13912734_1304827302861572_8982105660035215221_n.jpg?oh=092240ca4fd296078ca3db964099b960&oe=59F0342D'},
        {id: 3, first: 'Alexander', last: 'Schnapp', display: 'Alex Schnapp', email: 'alexanderschnapp@gmail.com', facebook_id: '1621139734603264', img_url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/15826540_1398304236886816_1966828284642904245_n.jpg?oh=6a50a81b9952d901a9dfff4e6f67c5cd&oe=59F22AB6'},
        {id: 4, first: 'Corey', last: 'Chau', display: 'Corey Chau', email: 'corey.chau@email.ucr.edu', facebook_id: '10211380969174557', img_url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/13406804_10207861632073329_904630480998034000_n.jpg?oh=f3d7b756cc536d9e160923935f8a7c3c&oe=5A10C74B'}
      ]);
    })
    .then(() => {
      return knex('stories').del()
        .then(() => {
          return knex('stories').insert([
            {id: 1, profile_id: 1, aws_link:'https://s3-us-west-1.amazonaws.com/vrstories/01391021_Estonian_Dance_360-1024x512.jpg', metadata: 'image/jpeg'},
            {id: 2, profile_id: 1, aws_link:'https://s3-us-west-1.amazonaws.com/vrstories/360+degree+Video-+Pugs+Chompin+down.mp4', metadata: 'video/mp4'},
            {id: 3, profile_id: 2, aws_link:'https://s3-us-west-1.amazonaws.com/vrstories/360-panorama-matador-seo.jpg', metadata: 'image/jpeg'},
            {id: 4, profile_id: 2, aws_link:'https://s3-us-west-1.amazonaws.com/vrstories/Mega+Coaster-+Get+Ready+for+the+Drop+(360+Video)+-+YouTube.mp4', metadata: 'video/mp4'},
            {id: 5, profile_id: 3, aws_link:'https://s3-us-west-1.amazonaws.com/vrstories/Surrounded+by+Wild+Elephants+in+4k+360.mp4', metadata: 'video/mp4'},
            {id: 6, profile_id: 3, aws_link:'https://s3-us-west-1.amazonaws.com/vrstories/gear-360_real360.jpg', metadata: 'image/jpeg'},
            {id: 7, profile_id: 4, aws_link:'https://s3-us-west-1.amazonaws.com/vrstories/360-view.jpg', metadata: 'image/jpeg'},
            {id: 8, profile_id: 4, aws_link:'https://s3-us-west-1.amazonaws.com/vrstories/Cute+Cats+VR+360+Experience.mp4', metadata: 'video/mp4'},
          ]);
        });
    });
};
