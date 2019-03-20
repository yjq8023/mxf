var express = require('express');
var config = require('../config');
var fs = require('fs');
var router = express.Router();


/* GET home page. */
router.get('/list', function(req, res, next) {
    res.send(123);
    // fs.readFile(config.dataUrl, (err, data) => {
    //     if (err) {
    //       res.send('error');
    //     } else {
    //         console.log(data.toString());
    //         res.send(123);
    //     }
    // });
});


module.exports = router;
