const { firebase, admin } = require('./firebaseConfig');

module.exports = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer', '').trim()

    admin.auth().verifyIdToken(token)
    .then(function (decodedToken) {
        req.uid = decodedToken.uid
        return next()
    }).catch(function (error) {
        res.send(error)
    });

};
