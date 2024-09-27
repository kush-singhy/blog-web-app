import express from 'express';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';
uuidv4();

const port = 3000;

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

var posts = [];

app.get("/", (req, res) => {
    const postList = posts;
    res.render('index.ejs', {
        posts: postList
    });
});

app.get("/newpost", (req, res) => {
    res.render('newpost.ejs');
});

app.post("/publish", (req, res) => {
    const postId = uuidv4();
    const title = req.body["title"];
    const content = req.body["content"];

    const newPost = { id: postId, title: title, content: content };
    posts.push(newPost);

    res.render('post.ejs', {
        post: newPost
    })
});

app.get("/post/:id", (req, res) => {
    const postId = req.params.id;
    const post = posts.find(p => p.id === postId);

    res.render('post.ejs', { post: post });
})

app.get("/edit/:id", (req, res) => {
    const postId = req.params.id;
    const post = posts.find(p => p.id === postId);

    res.render('edit.ejs', { post: post });
})

app.put("/savechanges/:id", (req, res) => {
    const postId = req.params.id;
    const post = posts.find(p => p.id === postId);

    const title = req.body["title"];
    const content = req.body["content"];
    
    res.render('post.ejs', {
        post: newPost
    })
});

app.listen(port, (req, res) => {
    console.log(`Server is listening on port ${port}`);
})