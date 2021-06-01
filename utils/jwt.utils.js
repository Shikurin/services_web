// Imports
var jwt = require('jsonwebtoken');

const signature_secrete = 'ab=p7th(v3kqrq0@wzj-)hb0(vv0rsoo!j8r1+)-=1b-y!it@';

// Exported functions
module.exports = {
  genererToken: function(userData) {
    return jwt.sign({
      userId: userData.mail,
    },
    signature_secrete,
    {
      expiresIn: '24h'
    })
  }
}