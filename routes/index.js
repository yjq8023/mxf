var express = require('express');
var router = express.Router();
var database = require('../databas');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/stock/list', function(req, res, next) {
  database.query('SELECT * FROM record', (err, data) => {
    res.send(data);
  })
});


module.exports = router;
