Meteor.methods({
    commentOnPost: function (comment, postId) {
        // Check argument types
        check(comment, String);
        check(postId, String);

        if (!this.userId) {
            throw new Meteor.Error("not-logged-in",
                "Must be logged in to post a comment.");
        }

        // ... do stuff ...

        return "something";
    },

    otherMethod: function () {
        // ... do other stuff ...
    }
});
