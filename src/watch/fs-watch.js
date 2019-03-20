const config = require('../../config')
const dataStar = require('./updata')

let dataAll = []

var chokidar = require('chokidar');

var watcher = chokidar.watch(config.dataFilePath, {
    ignored: /[\/\\]\./, persistent: true
});


watcher
    .on('raw', function(event, path, details) {
        let data = dataStar.openFile(path)
        if (data) {
            dataAll = dataAll.concat(data)
            console.log('文件最新内容:' +  dataAll.length)
        }
    })