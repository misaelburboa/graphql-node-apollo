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
            after: args.after,
            orderBy: args.orderBy
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

    me(parent, args, { prisma, request }, info) {
        const userId = getUserId(request);
        return prisma.query.user({
            where: {
                id: userId
            }
        }, info);
    }
};

export { Query as default };