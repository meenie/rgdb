angular.module('gifCategories', [])
    .factory('gifCategories', function() {
        var categories = [
            'Disgust/Abort Thread', 'Amazed/Excited/Nailed it', 'Clapping', 'Sad/Upset/Angry', 'Agreement/Not Bad',
            'Popcorn/Dis Gun B Gud', 'Haters Gonna Hate', 'Didn\'t Read lol', 'Mind Blown', 'Upvotes',
            'Controversial (Upvote/Downvote)', 'Downvotes', 'Wut/Confused', 'Faking Interest/Cool Story Bro', 'Dancing',
            'Fuck You/U Mad Bro?', 'OP is a faggot', 'Deal With It', 'Not Giving A Fuck', 'Erections/Fapping',
            'Laughing', 'Self-Inflected', 'Cats/Pets/Animals', 'Obama', 'Children Demolition', 'Party Hard/Swag',
            'Fighting/Minor-Injury/Pranks/Slaps', '[NSFW] Boobs and Asses', 'Sports', 'Nigel Thornberry', 'Racist',
            'Feels/NoUpsetJimmies', 'Skill', 'Doctor Who', 'Community', 'Star Trek', 'Adventure Time', 'MLP',
            'Spongebob Squarepants', 'Thanks, Obama'
        ].sort();

        categories.push('Miscellaneous');

        return categories;
    });