const fs = require('fs');
const util = require('util');

const readChunk = util.promisify(readFileBetweenOffsets);
function readFileBetweenOffsets(filePath, currentOffset, nextOffset, callback) {
    if (currentOffset >= nextOffset) {
        return callback(new Error('currentOffset must be less than nextOffset'));
    }

    const bufferSize = nextOffset - currentOffset;
    fs.open(filePath, 'r', (err, fd) => {
        if (err) {
            return callback(err);
        }

        const buffer = Buffer.alloc(bufferSize); 

        fs.read(fd, buffer, 0, bufferSize, currentOffset, (err, bytesRead, buffer) => {
            if (err) {
                fs.close(fd, () => {});
                return callback(err);
            }
            fs.close(fd, () => {});
            callback(null, buffer.toString()); // Or buffer.toString('utf8') if needed
        });
    });
}


module.exports = readChunk;
// // Example usage:

// (   (async () => {
//         const data = await readFileFromLinesPromise('sample.log', 50, 4205);
//         console.log(data);
//     })()
// )
