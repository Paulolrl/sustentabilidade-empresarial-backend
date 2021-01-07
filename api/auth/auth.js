const { firebase, admin } = require('../../firebaseConfig');
const userController = require('../controllers/userController');

// exports.signup = (req, res) => {
//     firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password)
//         .then(function () {
//             firebase.auth().currentUser.getIdToken(true).then(function (idToken) {
//                 res.send(idToken)
//                 res.end()
//             }).catch(function (error) {
//                 console.log(error)
//             });
//         }).catch(function (error) {
//             //Handle error
//         });
// }
//
// exports.login = (req, res) => {
//     // const userInfo = {
//     //     email: "example@exapmle.com",
//     //     password: "example"
//     // }
//     firebase.auth().signInWithEmailAndPassword(/*userInfo.email, userInfo.password*/req.body.email, req.body.password)
//         .then(function () {
//             firebase.auth().currentUser.getIdToken(true).then(function (idToken) {
//                 res.send(idToken)
//                 res.end()
//             }).catch(function (error) {
//                 //Handle error
//             });
//             // admin.auth().createCustomToken(uid)
//             //     .then(function (customToken) {
//             //         res.send(customToken)
//             //         res.end()
//             //     })
//             //     .catch(function (error) {
//             //         console.log('Error creating custom token:', error);
//             //     });
//         }).catch(function (error) {
//             //Handle error
//         });
// }
//
// exports.logout = (req, res) => {
//     firebase.auth().signOut().then(function () {
//         res.send(null)
//         res.end()
//     }).catch(function (error) {
//         //Handle error
//     });
// }

exports.verifyToken = (req, res, next) => {
    let token = req.header('Authorization');

    if(token){
      token = token.replace('Bearer', '').trim();
      admin.auth().verifyIdToken(token)
      .then(async function (decodedToken) {
          try {
            req.uid = decodedToken.uid;
            req.email = decodedToken.email;
            let user = await userController.getByUid(req.uid);
            if(user && !decodedToken.email_verified) {
              res.status(401).json({message: 'Email not verified'});
            } else {
              req.user = user;
              return next();
            }
          } catch(e) {
            res.status(401).json({message: 'Unable to authenticate token', error: e});
          }
      }).catch(function (e) {
          res.status(401).json({message: 'Unable to authenticate token', error: e});
      });
    } else {
      res.status(401).json({message: 'No token was provided'});
    }

};

exports.verifyAdmin = (req, res, next) => {
    try {
      if(req.user.isAdmin){
        return next();
      } else {
        res.status(403).json({message: 'User does not have admin privileges'});
      }
    } catch(e) {
      res.status(403).json({message: 'Unable to verify admin access', error: e});
    }
}

// exports.userBasedFunc = (req, res) =>{
//     //logs user id
//     console.log(req.user)
// }
