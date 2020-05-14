'use strict';

require('@babel/polyfill');

var _graphqlYoga = require('graphql-yoga');

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

var _index = require('./resolvers/index');

var _prisma = require('./prisma');

var _prisma2 = _interopRequireDefault(_prisma);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pubsub = new _graphqlYoga.PubSub();

var server = new _graphqlYoga.GraphQLServer({
    // provide the type definitions stored in the graphql file
    typeDefs: './src/schema.graphql',
    // Here is providing the resolvers
    resolvers: _index.resolvers,
    // Here provides the arguments for being use in the context (ctx)
    // variable in resolvers so you can access ctx.db for example
    context: function context(request) {
        return {
            db: _db2.default,
            pubsub: pubsub,
            prisma: _prisma2.default,
            request: request
        };
    },

    fragmentReplacements: _index.fragmentReplacements
});

var options = { port: process.env.PORT || 4000 };
server.start(options, function () {
    console.log('The server is up!');
});