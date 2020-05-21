import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../src/prisma';

const userOne = {
    input: {
        name: 'Misael',
        email: 'misaelburboa@testing.com',
        password: bcrypt.hashSync('blue123!')
    },
    user: undefined,
    jwt: undefined
};

const seedDatabase = async () => {
    // Delete test data
    await prisma.mutation.deleteManyPosts();
    await prisma.mutation.deleteManyUsers();
    // Create user one
    userOne.user = await prisma.mutation.createUser({
        data: userOne.input
    });
    userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET);

    await prisma.mutation.createPost({
        data: {
            title: 'My publish post',
            body: '',
            published: true,
            author: {
                connect: {
                    id: userOne.user.id
                }
            }
        }
    });
    await prisma.mutation.createPost({
        data: {
            title: 'My draft post',
            body: '',
            published: false,
            author: {
                connect: {
                    id: userOne.user.id
                }
            }
        }
    });
};

export { seedDatabase as default, userOne };