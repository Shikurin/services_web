//Routes
module.exports = {
	
	index: function(req, res) {
    		res.render('pages/index');
	},

	about: function(req, res) {
    		res.render('pages/about');
	},

	register: function(req, res) {
		res.render('pages/register');
	},

	login: function(req, res) {
		res.render('pages/login');
	}	
}	