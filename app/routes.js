// app/routes.js
module.exports = function(app, passport) {

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/', function(req, res) {
		res.render('index.ejs'); // load the index.ejs file
	});

	app.get('/nikhil', function (req, res) {
		var path = require('path'),
    	fs = require('fs');
    	res.sendfile(path.resolve('./views/images/nikhil.jpg'));
	});

	app.get('/animesh', function (req, res) {
		var path = require('path'),
    	fs = require('fs');
    	res.sendfile(path.resolve('./views/images/animeshr.jpg'));
	});

	app.get('/abhishek', function (req, res) {
		var path = require('path'),
    	fs = require('fs');
    	res.sendfile(path.resolve('./views/images/abhishek.jpg'));
	});

	app.get('/background', function (req, res) {
		var path = require('path'),
    	fs = require('fs');
    	res.sendfile(path.resolve('./views/images/blockchain-ledger.jpg'));
	});

	app.get('/createstream', function (req, res) {
		var stream_name = req.query.mytext5;
		var file = "multichain-cli chain300 create stream " + stream_name + " true";
		const execSync = require('child_process').execSync;
	 	code = execSync(file);
	 	file = "multichain-cli chain300 subscribe " + stream_name;
	 	code = execSync(file);
	 	code = unescape(encodeURIComponent(code));
	 	console.log(code);
	 	res.render('transaction.ejs');
	});

	app.get('/myform1', function(req, res) {
		var sender=req.query.mytext;
		var amount=req.query.mytext2;
		var stream_name=req.query.mytext8;
		console.log("Sender: "+sender);
		console.log("Amount: "+amount);
		var data=sender+" owes "+req.user.username+" an amount of "+amount;
		data=hexEncode(data);
		const execSync = require('child_process').execSync;
		var file = "multichain-cli chain300 subscribe " + stream_name;
		code = execSync(file);
		file=" bash ./scripts/new_transaction.sh "+data + " " + stream_name;
		console.log(file);
		code = execSync(file);
	 	code = unescape(encodeURIComponent(code));
	 	console.log(code);
		var data1 = 'multichain-cli chain300 liststreamitems ' + stream_name;
	 	code = execSync(data1);
	 	code = unescape(encodeURIComponent(code));
	 	console.log(code);
		// render the page and pass in any flash data if it exists
		res.render('onLogin.ejs', {
			user : code, // get the user out of session and pass to template
			stream_name : stream_name
		});
	});

	app.get('/myform2', function(req, res) {
		var sender=req.query.mytext3;
		var amount=req.query.mytext4;
		var stream_name=req.query.mytext9;
		console.log("Sender: "+sender);
		console.log("Amount: "+amount);
		var data=sender+" paid "+req.user.username+" an amount of "+amount;
		data=hexEncode(data);
		const execSync = require('child_process').execSync;
		var file = "multichain-cli chain300 subscribe " + stream_name;
		code = execSync(file);
		file=" bash ./scripts/new_transaction.sh "+data + " " + stream_name;
		console.log(file);
	 	code = execSync(file);
	 	code = unescape(encodeURIComponent(code));
	 	console.log(code);
		var data1 = 'multichain-cli chain300 liststreamitems ' + stream_name;
	 	code = execSync(data1);
	 	code = unescape(encodeURIComponent(code));
	 	console.log(code);
		// render the page and pass in any flash data if it exists
		res.render('onLogin.ejs', {
			user : code, // get the user out of session and pass to template
			stream_name : stream_name
		});
	});

	app.get('/mytransactions', function(req, res) {

		console.log(req.user.hash.substring(0,req.user.hash.length-1));
		var hash = req.user.hash.substring(0,req.user.hash.length-1);
		const execSync = require('child_process').execSync;
		var stream_name = "stream1";
		var file = "multichain-cli chain300 subscribe stream1";
		code = execSync(file);
		file = "bash ./scripts/publisher_items.sh " + "1JMV1SMvQ5qUSZqGfozVfeTgfacS2BDfrrYLCm" + " " + stream_name;
		console.log(file);
	 	code = execSync(file);
	 	code = unescape(encodeURIComponent(code));
	 	console.log(code);
	 			res.render('mytransactions.ejs', {
			user : code, // get the user out of session and pass to template
			stream_name : stream_name
		});
	});

	app.get('/mytransactions1', function(req, res) {
		var stream_name = req.query.mytext6;
		console.log(req.user.hash.substring(0,req.user.hash.length-1));
		var hash = req.user.hash.substring(0,req.user.hash.length-1);
		const execSync = require('child_process').execSync;
		var file = "multichain-cli chain300 subscribe " + stream_name;
		code = execSync(file);
		file = "bash ./scripts/publisher_items.sh " + "1JMV1SMvQ5qUSZqGfozVfeTgfacS2BDfrrYLCm" + " " + stream_name;
		console.log(file);
	 	code = execSync(file);
	 	code = unescape(encodeURIComponent(code));
	 	console.log(code);
		res.render('mytransactions.ejs', {
			user : code, // get the user out of session and pass to template
			stream_name : stream_name
		});
	});

	app.get('/getinfo', function(req, res) {
		var file = "bash ./scripts/getinfo.sh";
		console.log(file);
		const execSync = require('child_process').execSync;
	 	code = execSync(file);
	 	code = unescape(encodeURIComponent(code));
	 	console.log(code);
	 	res.render('getinfo.ejs', {
			user : code // get the user out of session and pass to template
		});
	});

	app.get('/transaction', function(req, res) {
		res.render('transaction.ejs'); // load the index.ejs file
	});

	// app.get('/onlogin', function(req, res) {
	// 	res.render('onLogin.ejs'); // load the index.ejs file
	// });

	app.get('/about', function(req, res) {
		var fs = require ("fs");
		 var data = fs.readFileSync("./scripts/script1.sh","utf8");
		 var spawn = require('child_process').spawn;
		 console.log(data);
		 var shellSyntaxCommand = data;
		 spawn('sh', ['-c', shellSyntaxCommand], { stdio: 'inherit' });
		 //console.log(x);
		 var exec = require('child_process').exec;
		 var child;
		 child = exec(data,
		   function (error, stdout, stderr) {
		      console.log('stdout: ' + stdout);
		      console.log('stderr: ' + stderr);
		      if (error !== null) {
		          console.log('exec error: ' + error);
		      }
		   });
		res.render('about.ejs'); // load the index.ejs file
	});

	app.get('/contact', function(req, res) {
		res.render('contact.ejs'); // load the index.ejs file
	});

	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/login', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});


	// process the login form
	app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/onlogin', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
		}),
        function(req, res) {
            console.log("hello");

            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
            var fs = require ("fs");
		 	var data = fs.readFileSync("./scripts/chain_connection.sh","utf8");
		 	var exec = require('child_process').exec;
			 var child;
			 child = exec(data,
			   function (error, stdout, stderr) {
			      console.log('stdout: ' + stdout);
			      console.log('stderr: ' + stderr);
			      if (error !== null) {
			          console.log('exec error: ' + error);
			      }
			   });
        res.redirect('/');
    });

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/login', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
		//console.log(req.user);
		res.render('profile.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});

	app.get('/query', function(req, res) {
		var stream_name = req.query.mytext6;
		var file = "multichain-cli chain300 subscribe "+stream_name;
		const execSync = require('child_process').execSync;
	 	code = execSync(file);
	 	file = "multichain-cli chain300 liststreamitems "+stream_name;
	 	code = execSync(file);
	 	code = unescape(encodeURIComponent(code));
	 	console.log(code);
		// render the page and pass in any flash data if it exists
		res.render('onLogin.ejs', {
			user : code, // get the user out of session and pass to template
			stream_name : stream_name
		});
		// render the page and pass in any flash data if it exists
	});

	app.get('/query1', function(req, res) {
		var stream_name = req.query.mytext6;
		var file = "multichain-cli chain300 subscribe "+stream_name;
		const execSync = require('child_process').execSync;
	 	code = execSync(file);
	 	file = "multichain-cli chain300 liststreamitems "+stream_name;
	 	code = execSync(file);
	 	code = unescape(encodeURIComponent(code));
	 	console.log(code);
		// render the page and pass in any flash data if it exists
		res.render('mytransactions.ejs', {
			user : code, // get the user out of session and pass to template
			stream_name : stream_name
		});
		// render the page and pass in any flash data if it exists
	});

	app.get('/onlogin', function(req, res) {
		console.log(req.user.hash.substring(0,req.user.hash.length-1));
		var hash = req.user.hash.substring(0,req.user.hash.length-1);
		// var fs = require ("fs");
	 	// var data = fs.readFileSync("./scripts/chain_connection.sh","utf8");
	 	var data1 = 'multichaind chain300 -daemon';
	 	var data2 = 'multichain-cli chain300 subscribe stream1';
	 	var data = 'multichain-cli chain300 liststreamitems stream1';
	 	const execSync = require('child_process').execSync;
	 	code = execSync(data1);
	 	code = execSync(data2);
	 	code = execSync(data);
	 	code = unescape(encodeURIComponent(code));
	 	console.log(code);
		// render the page and pass in any flash data if it exists
		var stream_name = "stream1";
		res.render('onLogin.ejs', {
			user : code, // get the user out of session and pass to template
			stream_name : stream_name
		});
	});


	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}

function hexEncode(str){
    var hex, i;

    var result = "";
    for (i=0; i<str.length; i++) {
        hex = str.charCodeAt(i).toString(16);
        result += ("000"+hex).slice(-4);
    }

    return result;
}

function hexDecode(str){
    var j;
    var hexes = str.match(/.{1,4}/g) || [];
    var back = "";
    for(j = 0; j<hexes.length; j++) {
        back += String.fromCharCode(parseInt(hexes[j], 16));
    }

    return back;
}
