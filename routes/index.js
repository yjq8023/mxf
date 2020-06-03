var express = require('express');
var router = express.Router();
var database = require('../databas');
var fs = require('fs')
var path = require('path')

/* GET home page. */
router.get('/', function(req, res, next) {
  // var index = fs.readFileSync(path.join(__dirname, '../public/web/index.html'), {encoding:'binary'});
  // res.render('index', { title: 'Express' });
  // res.end(index)
  res.redirect('/web/index.html');
});

router.get('/stock/list', function(req, res, next) {
  let count = 0
  var params = {
    search_text: req.query.searchText,
    start_time: req.query.startTime || 0,
    end_time: req.query.endTime || new Date().getTime(),
    scenes: req.query.scenes
  }

  let page = {
    page: req.query.page ?  req.query.page - 1 : 0,
    rows: req.query.rows || 10
  }

  let whereSql = ''
  let limitSql = ` LIMIT ${page.page * page.rows}, ${page.rows}`
  if (params.search_text) {
    whereSql = ` WHERE (stockCode LIKE '${params.search_text}%' OR stockName LIKE '%${params.search_text}%')
                AND (updateTime > ${params.start_time} AND updateTime < ${params.end_time})`
  } else {
    whereSql = ` WHERE  (updateTime > ${params.start_time} AND updateTime < ${params.end_time})`
  }

  if (params.scenes) {
    whereSql +=  ` AND type = '${params.scenes}'`
  }


  database.query('SELECT * FROM stock ' + whereSql + limitSql, (err, data) => {
    if(err) {
      res.send({type: 'error', error: err})
    } else {
      database.query(`SELECT COUNT(*) FROM stock` + whereSql, (err, data2) => {
        if (err) {
          res.send({type: 'error', error: err})
        }
        count = data2[0]['COUNT(*)']
        res.send({
          type: 'success',
          rows: count,
          data: data
        });
      })
    }
  })
});


module.exports = router;
