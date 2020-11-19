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

// localhost:3000/users/contacts
router.get('/contacts', function (req, res, next) {
  res.send("update me")
});


// (userID, index) = (1, 0), (2, 1), (3, 2)...
// localhost:3000/users/1
router.get('/:id', function (req, res, next) {
  const userID = Number.parseInt(req.params.id);
  fs.readFile('./data/users.json', (err, data) => {
    if (err) throw err;
    let users = JSON.parse(data);
    if (userID < 1 || userID > users.length || users.length === 0) {
      const error = getError(`ID not found: ${userID}`);
      res.status(404);
      res.json(error);
      return;
    }
    res.json(users[userID - 1]);  // O(1)
  });
});

module.exports = router;