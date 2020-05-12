import getUserId from '../utils/getUserId';

const Query = {
    // The resolvers functions always receive 4 params
    // commonly named: 
    // parent: This is used incase we are accessing complex data
    // args: received in the mutation for example
    // ctx: The context setup
    // info: Object containing the information of the operation made from the client (parameter that were required)
    users(parent, args, { prisma }, info) {
        const operationArgs = {
            first: args.first,
            skip: args.skip,
            after: args.after
        };

        if (args.query) {
            operationArgs.where = {
                OR: [{
                    name_contains: args.query
                }]
            };
        }

        return prisma.query.users(operationArgs, info);
    },
    posts(parent, args, { prisma }, info) {
        const opArgs = {
            first: args.first,
            skip: args.skip,
            after: args.after,
            where: {
                published: true
            }
        };

        if (args.query) {
            opArgs.where.OR = [{
                title_contains: args.query
            }, {
                body_contains: args.query
            }];
        }

        return prisma.query.posts(opArgs, info);
    },
    myPosts(parent, args, { prisma, request }, info) {
        const userId = getUserId(request);
        const opArgs = {
            first: args.first,
            skip: args.skip,
            after: args.after,
            where: {
                author: {
                    id: userId
                }
            }
        };

        if (args.query) {
            opArgs.where.OR = [{
                title_contains: args.query
            },{
                body_contains: args.query
            }];
        }

        return prisma.query.posts(opArgs, info);
    },
    comments(parent, args, { prisma }, info) {
        const opArgs = {
            first: args.first,
            skip: args.skip,
            after: args.after
        };

        return prisma.query.comments(opArgs, info);
    },
    me(parent, args, { prisma, request }, info) {
        const userId = getUserId(request);
        return prisma.query.user({
            where: {
                id: userId
            }
        }, info);
    },
    async post(parent, args, { prisma, request }, info) {
        const userId = getUserId(request, false);
        const posts = await prisma.query.posts({
            where: {
                id: args.id,
                OR: [{
                    published: true
                },{
                    author: {
                        id: userId
                    }
                }]
            }
        }, info);

        if (posts.length === 0) {
            throw new Error('Post not found');
        }

        return posts[0];
    }
};

export { Query as default };