import { GraphQLServer } from 'graphql-yoga';
import db from './db';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import User from './resolvers/User';
import Post from './resolvers/Post';
import Comment from './resolvers/Comment';

const server = new GraphQLServer({
    // provide the type definitions stored in the graphql file
    typeDefs: './src/schema.graphql',
    // Here is providing the resolvers
    resolvers: {
        Query,
        Mutation,
        User,
        Post,
        Comment
    },
    // Here provides the database for being use in the context (ctx)
    // variable in resolvers so you can access ctx.db for example
    context: {
        db
    }
});

const options = { port: 4000 };
server.start(options, () => {
    console.log('The server is up!');
});