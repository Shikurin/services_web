
var jwt = require('../utils/jwt.utils');
var utilisateur = require('../données/utilisateur.json');

//Routes
module.exports = {
	
	
	register: function(req, res) {	
		var mail = req.body.user_mail
		var mdp = req.body.user_mdp
		if(mail == null || mdp == null){
			return res.status(400).json({ 'error': 'missing parameters' });
		}
		const user = utilisateur.find(utilisateur => utilisateur.mail === mail)
		if( typeof user == 'undefined'){
			utilisateur.push(req.body)
			return res.status(200).json(utilisateur)
		}else{
			return res.status(500).json({ 'error': 'utilisateur deja existant'});
		}
	},
	login: function(req, res) {
		var mail = req.body.user_mail
		var mdp = req.body.user_mdp
		if(mail ==null || mdp == null){
			return res.status(400).json({ 'error': 'missing parameters' });
		}
		const user = utilisateur.find(utilisateur => utilisateur.mail === mail && utilisateur.mdp === mdp)
		if( typeof user != 'undefined'){
			return res.status(200).json({
			'userID' : user.mail,
			'token': jwt.genererToken(user)
		})
		}else{
			return res.status(600).json({ 'error': 'identifiants erronés'});
		}
	}
}	