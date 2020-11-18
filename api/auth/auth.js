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
            let user = await userController.getByUid(req.uid);
            req.user = user;
            return next();
          } catch(e) {
            res.send(e)
          }
      }).catch(function (error) {
          res.send(error)
      });
    } else {
      res.status(403).send('Token não foi enviado')
    }

};

exports.verifyAdmin = (req, res, next) => {
    try {
      if(req.user.isAdmin){
        return next()
      } else {
        res.status(403).send('Não autorizado');
      }
    } catch(e) {
      res.send(e);
    }
}

// exports.userBasedFunc = (req, res) =>{
//     //logs user id
//     console.log(req.user)
// }
