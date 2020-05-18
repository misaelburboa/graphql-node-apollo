import '@babel/polyfill/noConflict';
import server from './server';

const options = { port: process.env.PORT || 4000 };
server.start(options, () => {
    console.log('The server is up!');
});