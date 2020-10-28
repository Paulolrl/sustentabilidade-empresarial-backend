const { firebase, admin } = require('./firebaseConfig');

module.exports = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer', '').trim()
    console.log('token', token);

    admin.auth().verifyIdToken(token)
    .then(function (decodedToken) {
        if(decodedToken.uid === user.uid)
        {
            req.user = user.uid
            return next()
        }
    }).catch(function (error) {
        res.send(error)
    });

};
