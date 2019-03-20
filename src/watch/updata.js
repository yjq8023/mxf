const fs = require('fs')
const config = require('../../config')
var iconv = require('iconv-lite');

function openFile(file) {
    let str = ''
    try {
        var fileStr = fs.readFileSync(file, {encoding:'binary'});
        var buf = new Buffer(fileStr, 'binary');
        str = iconv.decode(buf, 'GBK');
    } catch (e) {
        str = ''
    }


    if (!str || str.trim().length < 5) {
        return null
    } else {
        fs.writeFile(file, '',function(err){
        });

        return compile(str)
    }
}


let compile = (data) => {

    console.log(data);
    const dataArr = []
    data.split('\n').forEach((item) => {
        if(item.trim()) {
            dataArr.push(item.trim())
        }
    })

    const dataObj = []

    dataArr.forEach((item) => {
        const itemArrRoot = item.split('  ')
        const itemArr = []
        itemArrRoot.forEach(item => {
            if (item.trim()) {
                itemArr.push(item.trim())
            }
        })
        const obj = {
            id: itemArr[0],
            name: itemArr[1],
            upTime: itemArr[2],
            price: itemArr[3],
            gains: itemArr[4],
            num: itemArr[5],
            fName: itemArr[6],
        }
        dataObj.push(obj)
    })
    console.log(dataObj);
    saveData(dataObj)
    return dataObj
}

function saveData(data) {
    fs.writeFile(config.dataUrl, JSON.stringify(data).toString('utf-8'),function(err){
    });
}

module.exports = { openFile}