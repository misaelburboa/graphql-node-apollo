import bcrypt from 'bcryptjs';
import prisma from '../../src/prisma';

const seedDatabase = async () => {
    await prisma.mutation.deleteManyPosts();
    await prisma.mutation.deleteManyUsers();
    const user = await prisma.mutation.createUser({
        data: {
            name: 'Misael',
            email: 'misaelburboa@testing.com',
            password: bcrypt.hashSync('blue123!')
        }
    });
    await prisma.mutation.createPost({
        data: {
            title: 'My publish post',
            body: '',
            published: true,
            author: {
                connect: {
                    id: user.id
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
                    id: user.id
                }
            }
        }
    });
};

export { seedDatabase as default };