const Query = {
    // The resolvers functions always receive 4 params
    // commonly named: parent, args, ctx, info
    users(parent, args, { prisma }, info) {
        const operationArgs = {};

        if (args.query) {
            operationArgs.where = {
                OR: [{
                    name_contains: args.query
                }, {
                    email_contains: args.query
                }]
            };
        }

        return prisma.query.users(operationArgs, info);
    },
    posts(parent, args, { prisma }, info) {
        const opArgs = {};

        if (args.query) {
            opArgs.where = {
                OR: [{
                    title_contains: args.query
                }, {
                    body_contains: args.query
                }]
            };
        }
        return prisma.query.posts(opArgs, info);
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