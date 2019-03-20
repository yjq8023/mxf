var express = require('express');
var router = express.Router();
var config = require('../config');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/stock/list', function(req, res, next) {
    fs.readFile(config.dataUrl, (err, data) => {
        if (err) {
          res.send('error');
          return;
        }
        res.send(data.toString());
    });
});

module.exports = router;
