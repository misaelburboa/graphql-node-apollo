import bcrypt from 'bcryptjs';
import getUserId from '../utils/getUserId';
import generateToken from '../utils/generateToken';
import hashPassword from '../utils/hashPassword';

const Mutation = {
    async login(parent, { data }, { prisma }, info) {
        const user = await prisma.query.user({
            where: {
                email: data.email
            }
        });

        if (!user) {
            throw new Error('Unable to login.');
        }

        const isMatch = await bcrypt.compare(data.password, user.password);
        if (!isMatch) {
            throw new Error('Unable to login.');
        }

        return {
            user,
            token: generateToken(user.id)
        };
    },
    async createUser(parent, args, { prisma }, info) {
        const password = await hashPassword(args.data.password);
        const user = await prisma.mutation.createUser({
            data: {
                ...args.data,
                password
            }
        });

        return {
            user,
            token: generateToken(user.id)
        };
    },
    async deleteUser(parent, args, { prisma, request }, info) {
        const userId = getUserId(request);
        const userExists = await prisma.exists.User({id: userId});
        if (!userExists) {
            throw new Error('User not found');
        }

        return await prisma.mutation.deleteUser({
            where: {
                id: userId
            } 
        }, info);
    },
    async updateUser(parent, args, { prisma, request }, info) {
        const userId = getUserId(request);

        if (typeof args.data.password === 'string') {
            args.data.password = await hashPassword(args.data.password);
        }

        return prisma.mutation.updateUser({
            data: args.data,
            where: {
                id: userId
            }
        }, info);
    },
    async createPost(parent, args, { prisma, request }, info) {
        const userId = getUserId(request);

        return await prisma.mutation.createPost({
            data: {
                title: args.data.title,
                body: args.data.body,
                published: args.data.published,
                author: {
                    connect: {
                        id: userId
                    }
                }
            }
        }, info);
    },
    async updatePost(parent, args, { prisma, request }, info) {
        const userId = getUserId(request);
        const postExists = await prisma.exists.Post({
            id: args.id,
            author: {
                id: userId
            }
        });

        const isPublished = await prisma.exists.Post({
            id: args.id,
            published: true
        });

        if (isPublished && args.data.published === false) {
            await prisma.mutation.deleteManyComments({
                where: {
                    post: {
                        id: args.id
                    }
                }
            });
        }

        if (!postExists) {
            throw new Error('Could not find the post. unable to delete');
        }

        return prisma.mutation.updatePost({
            data: args.data,
            where: {
                id: args.id
            }
        }, info);
    },
    async deletePost(parent, args, { prisma, request }, info) {
        const userId = getUserId(request);
        const postExists = await prisma.exists.Post({
            id: args.id,
            author: {
                id: userId
            }
        });

        if(!postExists) {
            throw new Error('Could not find the post. unable to delete');
        }
        
        return prisma.mutation.deletePost({
            where: {
                id: args.id
            }
        }, info);
    },
    async createComment(parent, args, { prisma, request }, info) {
        const userId = getUserId(request);
        const isPostPublished = await prisma.exists.Post({
            id: args.data.post,
            published: true
        });

        if (!isPostPublished) {
            throw new Error('The post you\'re trying to comment is not available');
        }
        
        return prisma.mutation.createComment({
            data: {
                text: args.data.text,
                author: {
                    connect: {
                        id: userId
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
    async deleteComment(parent, args, { prisma, request }, info) {
        const userId = getUserId(request);
        const commentExists = await prisma.exists.Comment({
            id: args.id,
            author: {
                id: userId
            }
        });

        if (!commentExists) {
            throw new Error('The comment does not exists');
        }

        return prisma.mutation.deleteComment({
            where: {
                id: args.id
            }
        });
    },
    async updateComment(parent, args, { prisma, request }, info) {
        const userId = getUserId(request);
        const commentExists = await prisma.exists.Comment({
            id: args.id,
            author: {
                id: userId
            }
        });

        if (!commentExists) {
            throw new Error('The comment does not exists');
        }

        return prisma.mutation.updateComment({
            data: args.data,
            where: {
                id: args.id
            }
        }, info);
    }
};

export { Mutation as default };