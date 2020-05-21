import '@babel/polyfill';
import 'cross-fetch/polyfill';
import { gql } from 'apollo-boost';
import seedDatabase, { userOne } from './utils/seedDatabase';
import getClient from './utils/getClient';

const client = getClient();

beforeEach(seedDatabase);

test('Should expose public posts', async () => {
    const getPosts = gql `
        query {
            posts {
                id
                title
                body
                published
            }
        }
    `;
    const response = await client.query({ query: getPosts });

    expect(response.data.posts.length).toBe(1);
    expect(response.data.posts[0].published).toBe(true);
});

test('Should fetch users posts', async () => {
    const client = getClient(userOne.jwt);
    const getPosts = gql`
        query {
            posts {
                id
                title
                body
                published
            }
        }
    `;

    const { data } = await client.query({ query: getPosts });
    expect(data.posts.length).toBe(2);
});