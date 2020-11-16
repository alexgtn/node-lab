const express = require('express');

const router = express.Router();

const fs = require('fs');


function getError(msg) {
    return {
        "msg": msg,
    }
}

/* GET posts listing. */
router.get('/', function (req, res, next) {
    fs.readFile('./data/posts.json', (err, data) => {
        if (err) throw err;
        let posts = JSON.parse(data);
        res.json(posts);
    });
});


/* Add posts listing. */
router.post('/', function (req, res, next) {
    fs.readFile('./data/posts.json', (err, data) => {
        if (err) throw err;
        let posts = JSON.parse(data);
        const postID = Number.parseInt(posts[posts.length - 1].id) + 1;
        if (req.body.text === null || req.body.text === undefined || req.body.text === ''){
            res.status(400);
            const error = getError("Invalid json, please specify 'text' attribute");
            res.send(error);
            return;
        }
        const newPost = {
            "id": postID,
            "author": {
                "firstname": "Gordon",
                "lastname": "Freeman",
                "avatar": "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
            },
            "createTime": new Date(),
            "likes": "15k",
            "text": req.body.text,
            "media": req.body.media,
        };
        posts.push(newPost);
        const buffer = JSON.stringify(posts);
        fs.writeFile('./data/posts.json', buffer, (err) => {
            if (err) throw err;
            res.json(posts);
        });
    });
});


module.exports = router;