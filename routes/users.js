const express = require('express');
const router = express.Router();
const fs = require('fs');

/* GET users tasks listing. */

// localhost:3000/users/
router.get('/', function (req, res, next) {
  fs.readFile('./data/users.json', (err, data) => {
    if (err) throw err;
    let users = JSON.parse(data);
    res.json(users);
  });
});

function getError(msg) {
  return {
    "msg": msg,
  }
}

// localhost:3000/users/1
router.get('/:id', function (req, res, next) {
  const userID = Number.parseInt(req.params.id);
  fs.readFile('./data/users.json', (err, data) => {
    if (err) throw err;
    let users = JSON.parse(data);
    if (userID < 1 || userID >= users.length) {
      const error = getError(`Invalid id: ${userID}`);
      res.status(404);
      res.send(error);
    }
    for (let i=0; i<users.length; i++){
      if (users[i].id === userID) {
        res.json(users[i]);
        break;
      }
    }
  });
});

// localhost:3000/users/contacts
router.get('/contacts', function (req, res, next) {
  res.send("update me")

  // fs.readFile('./data/users.json', (err, data) => {
  //   if (err) throw err;
  //   let tasks = JSON.parse(data);
  //   res.json(tasks);
  // });

});

module.exports = router;