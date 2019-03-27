var express = require('express');
var router = express.Router();
var database = require('../databas');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/stock/list', function(req, res, next) {
  let count = 0
  var params = {
    search_text: req.query.searchText,
    start_time: req.query.startTime || 0,
    end_time: req.query.endTime || new Date().getTime(),
  }

  let page = {
    page: req.query.page - 1,
    rows: req.query.rows
  }

  let whereSql = ''
  let limitSql = ` LIMIT ${page.page * page.rows}, ${page.rows}`
  if (params.search_text) {
    whereSql = ` WHERE (stock_code LIKE '${params.search_text}%' OR stock_name LIKE '%${params.search_text}%')
                AND (update_time > ${params.start_time} AND update_time < ${params.end_time})`
  } else {
    whereSql = ` WHERE  (update_time > ${params.start_time} AND update_time < ${params.end_time})`
  }

  database.query('SELECT * FROM record ' + whereSql + limitSql, (err, data) => {
    if(err) {
      res.send({type: 'error', error: err})
    } else {
      database.query(`SELECT COUNT(*) FROM record` + whereSql, (err, data2) => {
        if (err) {return}
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
