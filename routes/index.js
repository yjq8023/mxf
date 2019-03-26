var express = require('express');
var router = express.Router();
var database = require('../databas');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/stock/list', function(req, res, next) {
  database.query('SELECT * FROM record', (err, data) => {
    if(err) {
      res.send({type: 'error', error: err})
    } else {
      res.send({
        type: 'success',
        rows: 100,
        data: data
      });
    }
  })
});


module.exports = router;
