import { GraphQLServer } from 'graphql-yoga';
import uuidv4 from 'uuid/v4';

// Scalar types: String, Boolean, Int, Float, ID
let users = [{
    id: '1',
    name: 'Misael',
    email: 'cmburboa@gmail.com',
    age: 31
},{
    id: '2',
    name: 'Ale',
    email: 'ale@gmail.com'
},{
    id: '3',
    name: 'Alex',
    email: 'alex@gmail.com',
    age: 1
}];

let posts = [{
    id: '1',
    title: 'My Post title',
    body: 'This is my first post',
    published: false,
    author: "1"
},{
    id: '2',
    title: 'My Second Post title',
    body: 'This is my second post',
    published: true,
    author: "1"
},{
    id: '3',
    title: 'My Third Post title',
    body: 'This is my thid post',
    published: true,
    author: "2"
},{
    id: '4',
    title: 'My Fourth Post title',
    body: 'This is my fourth post',
    published: true,
    author: "3"
}];

let comments = [{
    id: '1',
    text: 'This is a great post',
    author: '1',
    post: '1'
},{
    id: '2',
    text: 'Awesome dude thanks!',
    author: '2',
    post: '2'
},{
    id: '3',
    text: 'Great post',
    author: '3',
    post: '3'
},{
    id: '4',
    text: 'this is totally unuseful',
    author: '4',
    post: '1'
},{
    id: '5',
    text: 'user dropped!',
    author: '2',
    post: '3'
}];

// Resolvers
const resolvers = {
    Query: {
        users(parent, args, ctx, info) {
            if (!args.query) {
                return users;
            }

            return users.filter((user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase());
            });
        },
        posts(parent, args, ctx, info) {
            if (!args.query) {
                return posts;
            }

            return posts.filter((post) => {
                return post.title.toLowerCase().includes(args.query.toLowerCase()) |
                post.body.toLowerCase().includes(args.query.toLowerCase())
            });
        },
        comments(parent, args, ctx, info) {
            return comments;
        },
        me() {
            return {
                id: '1234',
                name: 'misael',
                email: 'cmburboa@gmail.com',
                age: 31
            };
        },
        post() {
            return {
                id: '4321',
                title: 'This is my first Post!',
                body: 'This is the body of my post!.',
                published: true
            };
        }
    },
    Mutation: {
        createUser(parent, args, ctx, info) {
            const emailTaken = users.some(user => user.email === args.data.email);
            if (emailTaken) {
                throw new Error('Email taken');
            }

            const user = {
                id: uuidv4(),
                ...args.data
            };

            users.push(user);

            return user;
        },
        deleteUser(parent, args, ctx, info) {
            const userIndex = users.findIndex(user => user.id === args.id);

            if (userIndex === -1) {
                throw new Error('User not found');
            }

            const deletedUsers = users.splice(userIndex, 1);
            posts = posts.filter((post) => {
                const match = post.author === args.id;
                if (match) {
                    comments = comments.filter(comment => comment.post !== post.id);
                }

                return !match;
            });
            comments = comments.filter(comment => comment.author !== args.id);

            return deletedUsers[0];
        },
        createPost(parent, args, ctx, info) {
            const userExists = users.some(user => user.id === args.data.author);

            if (!userExists) {
                throw new Error ('User not found!');
            }

            const post = {
                id: uuidv4(),
                ...args.data
            };

            posts.push(post);

            return post;
        },
        deletePost(parent, args, ctx, info) {
            const postIndex = posts.findIndex(post => post.id === args.id);

            if (postIndex === -1) {
                throw new Error("Post not found!");
            }
            const deletedPosts = posts.splice(postIndex, 1);
            comments = comments.filter((comment) => comment.post !== args.id);

            return deletedPosts[0];
        },
        createComment(parent, args, ctx, info) {
            const post = users.some(user => user.id === args.data.author);
            const postExists = posts.some(post => post.id === args.data.post && post.published);

            if (!userExists) {
                throw new Error('User does not exists!');
            }

            if (!postExists) {
                throw new Error('The post does not exists!');
            }

            const comment = {
                id: uuidv4(),
                ...args.data
            };
            comments.push(comment);

            return comment;
        },
        deleteComment(parent, args, ctx, info) {
            const commentIndex = comments.findIndex(comment => comment.id === args.id);

            if (commentIndex === -1) {
                throw new Error("Comment not found!");
            }

            const deletedComments = comments.splice(commentIndex, 1);
            return deletedComments[0];
        }
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id == parent.author;
            });
        },
        comments(parent, args, ctx, info){
            return comments.filter(comment => comment.post === parent.id);
        }
    },
    Comment: {
        author(parent, args, ctx, info) {
            return users.find(user => user.id === parent.author);
        },
        post(parent, args, ctx, info) {
            return posts.find(post => post.id === parent.post);
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter((post) => post.author === parent.id);
        },
        comments(parent, args, ctx, info) {
            return comments.filter(comment => comment.author === parent.id);
        }
    }
};

const server = new GraphQLServer({
    typeDefs: './src/schema.grpahql',
    resolvers
});

const options = { port: 4000 };
server.start(options, () => {
    console.log('The server is up!');
});