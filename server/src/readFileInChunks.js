const fs = require('fs');
const readChunk = require('./readFile');

const BUFFER_SIZE = 1024;

const getCount = (str, chr) => {
    const cnt = (str.split(chr).length - 1);
    return cnt;
}

const getFileSize = (filePath) => {
    return fs.statSync(filePath).size;
}

const getLastNLines = async (filePath, n) => {
    const fileSize = getFileSize(filePath);

    let nextOffset = fileSize;
    let lineCnt = 0;
    let text = "";

    while(nextOffset >= -1 && lineCnt < n) {
        const currentOfset = Math.max(nextOffset - BUFFER_SIZE,-1);
        const chunk = await readChunk(filePath, currentOfset, nextOffset);
        text = chunk + text;

        nextOffset = currentOfset;
        lineCnt += getCount(chunk, '\n');
    }

    const startIdx = n + 1
    const lines = text.split('\n').slice(-startIdx);
    return lines.join('\n');
}

// (   (async () => {
//         const data = await getLastNLines('sample.log', 10);
//         console.log(data);
//     })()
// )

module.exports = getLastNLines;