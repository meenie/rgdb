angular.module('gifCategories', [])
    .factory('gifCategories', function() {
        var categories = [
            {name: 'Disgust/Abort Thread', imgUrl: 'http://i.imgur.com/l2sJib.jpg'},
            {name: 'Amazed/Excited/Nailed it', imgUrl: 'http://i.imgur.com/thj3Fb.jpg'},
            {name: 'Clapping', imgUrl: 'http://i.imgur.com/2sRECb.jpg'},
            {name: 'Sad/Upset/Angry', imgUrl: 'http://i.imgur.com/fkLF9b.jpg'},
            {name: 'Agreement/Not Bad', imgUrl: 'http://i.imgur.com/vESj1b.jpg'},
            {name: 'Popcorn/Dis Gun B Gud', imgUrl: 'http://i.imgur.com/Je3OPb.jpg'},
            {name: 'Haters Gonna Hate', imgUrl: 'http://i.imgur.com/hrm1Mb.jpg'},
            {name: 'Didn\'t Read lol', imgUrl: 'http://i.imgur.com/P0GPMb.jpg'},
            {name: 'Mind Blown', imgUrl: 'http://i.imgur.com/10gvOb.jpg'},
            {name: 'Upvotes', imgUrl: 'http://i.imgur.com/iC8UWb.jpg'},
            {name: 'Controversial (Upvote/Downvote)', imgUrl: 'http://i.imgur.com/AW12eb.jpg'},
            {name: 'Downvotes', imgUrl: 'http://i.imgur.com/IIhBGb.jpg'},
            {name: 'Wut/Confused', imgUrl: 'http://i.imgur.com/WuKZdb.jpg'},
            {name: 'Faking Interest/Cool Story Bro', imgUrl: 'http://i.imgur.com/S25EOb.jpg'},
            {name: 'Dancing', imgUrl: 'http://i.imgur.com/PqIYNb.jpg'},
            {name: 'Fuck You/U Mad Bro?', imgUrl: 'http://i.imgur.com/iyZiDb.jpg'},
            {name: 'OP is a faggot', imgUrl: 'http://i.imgur.com/tol5gb.jpg'},
            {name: 'Deal With It', imgUrl: 'http://i.imgur.com/uSuf5b.jpg'},
            {name: 'Not Giving A Fuck', imgUrl: 'http://i.imgur.com/UTo7Sb.jpg'},
            {name: 'Erections/Fapping', imgUrl: 'http://i.imgur.com/zm6Krb.jpg'},
            {name: 'Laughing', imgUrl: 'http://i.imgur.com/BFQBWb.jpg'},
            {name: 'Self-Inflected', imgUrl: 'http://i.imgur.com/bEdpqb.jpg'},
            {name: 'Cats/Pets/Animals', imgUrl: 'http://i.imgur.com/dbKVWb.jpg'},
            {name: 'Obama', imgUrl: 'http://i.imgur.com/BFXsBb.jpg'},
            {name: 'Children Demolition', imgUrl: 'http://i.imgur.com/8k74xb.jpg'},
            {name: 'Party Hard/Swag', imgUrl: 'http://i.imgur.com/jnx2db.jpg'},
            {name: 'Fighting/Minor-Injury/Pranks/Slaps', imgUrl: 'http://i.imgur.com/jZpE5b.jpg'},
            {name: '[NSFW] Boobs and Asses', imgUrl: 'http://i.imgur.com/vHcBDb.jpg'},
            {name: 'Sports', imgUrl: 'http://i.imgur.com/tKIeAb.jpg'},
            {name: 'Nigel Thornberry', imgUrl: 'http://i.imgur.com/mxXxCb.jpg'},
            {name: 'Racist', imgUrl: 'http://i.imgur.com/UitdYb.jpg'},
            {name: 'Feels/NoUpsetJimmies', imgUrl: 'http://i.imgur.com/D3lIhb.jpg'},
            {name: 'Skill', imgUrl: 'http://i.imgur.com/8CZoTb.jpg'},
            {name: 'Doctor Who', imgUrl: 'http://i.imgur.com/cMQLTb.jpg'},
            {name: 'Community', imgUrl: 'http://i.imgur.com/DOMMOb.jpg'},
            {name: 'Star Trek', imgUrl: 'http://i.imgur.com/8FJpEmFb.jpg'},
            {name: 'Adventure Time', imgUrl: 'http://i.imgur.com/TYkyNz1b.jpg'},
            {name: 'MLP', imgUrl: 'http://i.imgur.com/VSYRtb.jpg'},
            {name: 'Spongebob Squarepants', imgUrl: 'http://i.imgur.com/XFlyjXeb.jpg'},
            {name: 'Thanks, Obama', imgUrl: 'http://i.imgur.com/Np6gM6vb.jpg'}
        ].sort(function (a, b) {
                return a.name < b.name ? -1 : 1;
            });

        categories.push({name: 'Miscellaneous', imgUrl: 'http://i.imgur.com/LFyp0b.jpg'});

        return categories;
    });