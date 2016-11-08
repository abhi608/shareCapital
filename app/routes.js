// app/routes.js
module.exports = function(app, passport) {

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/', function(req, res) {
		res.render('index.ejs'); // load the index.ejs file
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

	app.get('/onlogin', function(req, res) {
		console.log(req.user.hash.substring(0,req.user.hash.length-1));
		var hash = req.user.hash.substring(0,req.user.hash.length-1);
		// var fs = require ("fs");
	 	// var data = fs.readFileSync("./scripts/chain_connection.sh","utf8");
	 	var data = 'multichain-cli chain251 liststreampublisheritems stream1 ' + hash;
	 	const execSync = require('child_process').execSync;
	 	code = execSync(data);
	 	code = unescape(encodeURIComponent(code));
	 	console.log(code);
		// render the page and pass in any flash data if it exists
		res.render('onLogin.ejs', {
			user : code // get the user out of session and pass to template
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
