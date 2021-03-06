const Query = {
    // The resolvers functions always receive 4 params
    // commonly named: parent, args, ctx, info
    users(parent, args, { db }, info) {
        if (!args.query) {
            return db.users;
        }

        return db.users.filter((user) => {
            return user.name.toLowerCase().includes(args.query.toLowerCase());
        });
    },
    posts(parent, args, { db }, info) {
        if (!args.query) {
            return db.posts;
        }

        return db.posts.filter((post) => {
            return post.title.toLowerCase().includes(args.query.toLowerCase()) |
            post.body.toLowerCase().includes(args.query.toLowerCase())
        });
    },
    comments(parent, args, { db }, info) {
        return db.comments;
    },
    me() {
        return {
            id: '1234',
            name: 'misael',
            email: 'cmburboa@gmail.com',
            age: 31
        };
    },
    post() {
        return {
            id: '4321',
            title: 'This is my first Post!',
            body: 'This is the body of my post!.',
            published: true
        };
    }
};

export { Query as default };