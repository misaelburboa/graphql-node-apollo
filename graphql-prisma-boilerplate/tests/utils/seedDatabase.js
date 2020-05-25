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

const userTwo = {
    input: {
        name: 'Caleb',
        email: 'calebburboa@testing.com',
        password: bcrypt.hashSync('red123!')
    },
    user: undefined,
    jwt: undefined
};

const seedDatabase = async () => {
    // Delete test data
    await prisma.mutation.deleteManyComments();
    await prisma.mutation.deleteManyPosts();
    await prisma.mutation.deleteManyUsers();
    // Create user one
    userOne.user = await prisma.mutation.createUser({
        data: userOne.input
    });
    userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET);

    // Create User Two
    userTwo.user = await prisma.mutation.createUser({
        data: userTwo.input
    });
    userTwo.jwt = jwt.sign({ userId: userTwo.user.id }, process.env.JWT_SECRET);
};

export { seedDatabase as default, userOne, userTwo };