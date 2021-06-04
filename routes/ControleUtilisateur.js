

//Routes
module.exports = {
	
	register: async function(req, res) {	
		var email = req.body.user_mail
		var mdpasse = req.body.user_mdp
		if(email == null || mdpasse == null){
			return res.status(400).json({ 'error': 'missing parameters' });
		}
		const presence = await db.collection('utilisateur').findOne({mail: email})
		if(presence === null){
			const user = await db.collection('utilisateur').insertOne({ isAdmin: "0", mail: email, mdp: mdpasse })
			return res.render('pages/index');
		}else{
			return res.status(500).json({ 'error': 'utilisateur déjà existant'});
		}

	},
	login: async function(req, res) {
		var email = req.body.user_mail
		var mdpasse = req.body.user_mdp
		if(email ==null || mdpasse == null){
			return res.status(400).json({ 'error': 'missing parameters' });
		}
		const user = await db.collection('utilisateur').findOne({mail: email,mdp: mdpasse})
		if(!(user === null)){
			console.log(user)
			console.log(user.isAdmin)
			if(user.isAdmin === '1'){
				IsLogin=2
			}else{
				IsLogin=1
			}
			return res.render('pages/index');
		}else{
			return res.status(600).json({ 'error': 'identifiants erronés'});
		}
	},
	logout: async function(req,res){
		IsLogin=0
		return res.render('pages/index');
	}
}

  