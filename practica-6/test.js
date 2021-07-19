const fs = require('fs');
const rs = fs.createReadStream('readme.md', 'utf-8')
const ws = fs.createWriteStream('test-readme.md', 'utf-8')

rs.pipe(ws)
rs.on('end', ()=>{
    console.log('this is done')
});