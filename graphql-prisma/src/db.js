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
    id: "1",
    title: 'My Post title',
    body: 'This is my first post',
    published: true,
    author: "1"
},{
    id: '2',
    title: 'My Second Post title',
    body: 'This is my second post',
    published: false,
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
    text: 'user dropped!',
    author: '2',
    post: '3'
}];

const db = {
    users,
    posts,
    comments
};

export { db as default };