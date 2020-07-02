const fs = require('fs');
const path = require('path');
const readline = require('readline');

const fileName = path.join(__dirname, '../../logs', 'access.log');

const resdStream = fs.createReadStream(fileName);

const rl = readline.createInterface({
    input: resdStream
});

let chromeNum = 0;
let sum = 0;

// 逐行读取
rl.on('line', (lineData) => {
    if (!lineData) return;
    // 总行数
    sum++;
    const arr = lineData.split(' -- ');
    if (arr[2] && arr[2].indexOf('Chrome') > 0) {
        chromeNum++;
    }
})

rl.on('close', () => {
    console.log(`chrome占比: ${chromeNum / sum * 100}%`);
})
