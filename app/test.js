const execSync = require('child_process').execSync;
// console.log("hash: " + req.user.hash.substring(0,req.user.hash.length-1));
// var hash = req.user.hash.substring(0,req.user.hash.length-1);
var file1 = 'bash ../scripts/readStream.sh';
var hash = execSync(file1);
hash = unescape(encodeURIComponent(hash));
console.log(JSON.parse(hash)[3].key);
