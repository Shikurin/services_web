var express = require('express')
var Ctrl = require('./routes/ControleUtilisateur')
var Rend = require('./routes/Affichage')

exports.routeur = (function(){
 var rout = express.Router();
 rout.route('/users/register/').get(Rend.register);
 rout.route('/users/login/').get(Rend.login);
 rout.route('/about/').get(Rend.about);
 rout.route('/').get(Rend.index);
 rout.route('/users/register/').post(Ctrl.register);
 rout.route('/users/login/').post(Ctrl.login);
 return rout
})();