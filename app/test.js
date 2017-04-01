const execSync = require('child_process').execSync;
var file1 = "bash ../scripts/getaddress.sh";
var code = execSync(file1);
code = unescape(encodeURIComponent(code));
console.log(code);