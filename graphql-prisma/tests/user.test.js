import '@babel/polyfill';
import 'cross-fetch/polyfill';
import { gql } from 'apollo-boost';
import prisma from '../src/prisma';
import seedDatabase from './utils/seedDatabase';
import getClient from './utils/getClient';

const client = getClient();

beforeEach(seedDatabase);

test('Should create a new user', async () => {
    const createUser = gql `
        mutation {
            createUser(
                data: {
                    name: "Misael",
                    email: "misa@hotmail.com",
                    password: "testing123"
                }
            ) {
                token,
                user {
                    id
                }
            }
        }
    `;

    const response = await client.mutate({
        mutation: createUser
    });

    const exists = await prisma.exists.User({ id: response.data.createUser.user.id });
    expect(exists).toBe(true);
});

test('Should expose public author profiles', async () => {
    const getUsers = gql `
        query {
            users {
                id
                email
                name
            }
        }
    `;

    const response = await client.query({ query: getUsers });

    expect(response.data.users.length).toBe(1);
    expect(response.data.users[0].email).toBe(null);
    expect(response.data.users[0].name).toBe("Misael");
});

test('Should not login with bad credentials', async () => {
    const login = gql `
        mutation {
            login(
                data: {
                    email: "jeff@testing.com",
                    password: "blue123!"
                }
            ) {
                token
            }
        }
    `;

    await expect(client.mutate({ mutation: login })).rejects.toThrow();
});

test('Should not signup user with invalid password', async () => {
    const createUser = gql `
        mutation {
            createUser(
                data: {
                    name: "Ale",
                    email: "ale.ozuna@hotmail.com",
                    password: "123"
                }
            ) {
                token
            }
        }
    `;

    await expect(client.mutate({ mutation: createUser })).rejects.toThrow();
});