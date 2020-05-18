import { GraphQLServer, PubSub } from 'graphql-yoga';
import db from './db';
import { resolvers, fragmentReplacements } from './resolvers/index';
import prisma from './prisma';

const pubsub = new PubSub();

const server = new GraphQLServer({
    // provide the type definitions stored in the graphql file
    typeDefs: './src/schema.graphql',
    // Here is providing the resolvers
    resolvers,
    // Here provides the arguments for being use in the context (ctx)
    // variable in resolvers so you can access ctx.db for example
    context(request) {
        return {
            db,
            pubsub,
            prisma,
            request
        };
    },
    fragmentReplacements
});

export { server as default};