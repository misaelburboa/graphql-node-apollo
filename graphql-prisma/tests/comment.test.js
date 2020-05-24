import '@babel/polyfill';
import 'cross-fetch/polyfill';
import prisma from '../src/prisma';
import seedDatabase, { userOne, commentTwo } from './utils/seedDatabase';
import getClient from './utils/getClient';
import { deleteComment } from './utils/operations';

beforeAll(async () => {
    jest.setTimeout(1000000);
});
beforeEach(seedDatabase);

test("Should delete own comment", async () => {
    const client = getClient(userOne.jwt);
    const variables = {
        id: commentTwo.comment.id
    };

    await client.mutate({ mutation: deleteComment, variables });
    const commentExists = await prisma.exists.Comment({
        id: commentTwo.comment.id,
        author: {
            id: userOne.user.id
        }
    });
    expect(commentExists).toBe(false);
});

test("Should not delete other users comments", async () => {
    2+2
});