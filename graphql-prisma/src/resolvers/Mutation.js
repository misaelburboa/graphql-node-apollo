import bcrypt from 'bcryptjs';

const Mutation = {
    async createUser(parent, args, { prisma }, info) {
        if (args.data.password.length < 8) {
            throw new Error('Password must be 8 characters or longer');
        }

        const password = await bcrypt.hash(args.data.password, 10);

        return await prisma.mutation.createUser({
            data: {
                ...args.data,
                password
            }
        }, info);
    },
    async deleteUser(parent, args, { prisma }, info) {
        const userExists = await prisma.exists.User({id: args.id});
        if (!userExists) {
            throw new Error('User not found');
        }

        return await prisma.mutation.deleteUser({ where: { id: args.id } }, info);
    },
    async updateUser(parent, args, { prisma }, info) {
        return prisma.mutation.updateUser({
            data: args.data,
            where: {
                id: args.id
            }
        }, info);
    },
    async createPost(parent, args, { prisma }, info) {
        return await prisma.mutation.createPost({
            data: {
                title: args.data.title,
                body: args.data.body,
                published: args.data.published,
                author: {
                    connect: {
                        id: args.data.author
                    }
                }
            }
        }, info);
    },
    updatePost(parent, args, { prisma }, info) {
        return prisma.mutation.updatePost({
            data: args.data,
            where: {
                id: args.id
            }
        }, info);
    },
    deletePost(parent, args, { prisma }, info) {
        return prisma.mutation.deletePost({
            where: {
                id: args.id
            }
        }, info);
    },
    createComment(parent, args, { prisma }, info) {
        return prisma.mutation.createComment({
            data: {
                text: args.data.text,
                author: {
                    connect: {
                        id: args.data.author
                    }
                },
                post: {
                    connect: {
                        id: args.data.post
                    }
                }
            }
        }, info);
    },
    deleteComment(parent, args, { prisma }, info) {
        return prisma.mutation.deleteComment({
            where: {
                id: args.id
            }
        });
    },
    updateComment(parent, args, { prisma }, info) {
        return prisma.mutation.updateComment({
            data: args.data,
            where: {
                id: args.id
            }
        }, info);
    }
};

export { Mutation as default };