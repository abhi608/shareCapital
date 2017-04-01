// const execSync = require('child_process').execSync;
// var file1 = "bash ../scripts/getaddress.sh";
// var code = execSync(file1);
// code = unescape(encodeURIComponent(code));
// console.log(code);

var mysql = require('mysql');
var dbconfig = require('../config/database');

var connection = mysql.createConnection(dbconfig.connection);

connection.query("SELECT IF('blockchain1' IN(SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA), 1, 0) AS found", function(err, res){
	if (err)
		console.log(err);
	else
		console.log(JSON.stringify(res)=='[{"found":1}]');
	connection.end();

});

