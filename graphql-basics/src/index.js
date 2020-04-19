import { GraphQLServer } from 'graphql-yoga';
// Scalar types: String, Boolean, Int, Float, ID
const users = [{
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

const posts = [{
    id: '1',
    title: 'My Post title',
    body: 'This is my first post',
    published: true,
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

const comments = [{
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
    text: 'thank you very much!',
    author: '2',
    post: '2'
}];

// Types Definitions(schema)
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments: [Comment!]!
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }

    type Comment {
        id: ID!
        text: String!
        author: User
        post: Post!
    }
`;

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
    typeDefs,
    resolvers
});

server.start(() => {
    console.log('The server is up!');
});