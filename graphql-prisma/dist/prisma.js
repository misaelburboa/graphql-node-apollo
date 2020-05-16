'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _prismaBinding = require('prisma-binding');

var _index = require('./resolvers/index');

var prisma = new _prismaBinding.Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: process.env.PRISMA_ENDPOINT,
    secret: process.env.PRISMA_SECRET,
    fragmentReplacements: _index.fragmentReplacements
});

exports.default = prisma;

// prisma.query.users(null, '{ id name posts { id title} }').then((data) => {
//     console.log(JSON.stringify(data, undefined, 4));
// });

// prisma.query.comments(null, '{ id text author { id name } }').then((data) => {
//     console.log(JSON.stringify(data, undefined, 2));
// });

// prisma.mutation.createPost({
//     data: {
//         title: "GraphQL 101",
//         body: "",
//         published: false,
//         author: {
//             connect: {
//                 id: "ck9csjimn01c40740ur3hs0rd"
//             }
//         }
//     }
// }, '{ id title body published }').then((data) => {
//     console.log(JSON.stringify(data, undefined, 2));
//     return prisma.query.users(null, '{ id name posts { id title } }');
// }).then((data) => {
//     console.log(JSON.stringify(data, undefined, 2));
// });

// const createPostForUser = async (authorId, data) => {
//     const userExists = await prisma.exists.User({ id: authorId });

//     if (!userExists) {
//         throw new Error('User not found!');
//     }

//     const post = await prisma.mutation.createPost({
//         data: {
//             ...data,
//             author: {
//                 connect: {
//                     id: authorId
//                 }
//             }
//         }
//     }, '{ author { id name email posts { id title published} } }');

//     return post.author;
// };

// createPostForUser('ck9csjimn01c40740ur3hs0rd', {
//     title: "Great book!",
//     body: "Our Worship Matters",
//     published: true
// }).then((user) => {
//     console.log(JSON.stringify(user,undefined, 2));
// }).catch(err => {
//     console.log(err.message);
// });

// prisma.mutation.updatePost({
//     data: {
//         published: false,
//         title: 'You can do it!'
//     },
//     where: {
//         id: 'ck9e8i6il02jj0740goi10rjb'
//     }
// }, '{ id }').then(data => {
//     return prisma.query.posts(null, '{ id title body published }');
// }).then(data => {
//     console.log(JSON.stringify(data, undefined, 2));
// });

// const updatePostForUser = async (postId, data) => {
//     const postExists = await prisma.exists.Post({
//         id: postId
//     });

//     if (!postExists) {
//         throw new Error('Post does not exists!');
//     }

//     const post = await prisma.mutation.updatePost({
//         data,
//         where: { id: postId }
//     }, '{ author { id name email posts { id title published} } }');

//     return post.author;
// };

// updatePostForUser("ck9e8i6il02jj0740goi10rjb", { published: true }).then((user) => {
//     console.log(JSON.stringify(user, undefined, 2));
// }).catch(err => {
//     console.log(err.message);
// });