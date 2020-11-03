require("firebase/auth");
const firebase = require('firebase')
const admin = require('firebase-admin')
const serviceAccount = require("./sustentabilidade-empresarial-firebase-adminsdk.json");

var firebaseConfig = {
  apiKey: "AIzaSyBcxEmCjr9ZZ8Ok-0Vvw5BoHR4AIAa84Go",
  authDomain: "sustentabilidade-empresarial.firebaseapp.com",
  databaseURL: "https://sustentabilidade-empresarial.firebaseio.com",
  projectId: "sustentabilidade-empresarial",
  storageBucket: "sustentabilidade-empresarial.appspot.com",
  messagingSenderId: "782236114999",
  appId: "1:782236114999:web:49b8d073d4559d9d9fdfb2",
  measurementId: "G-HV4HTBHNBF"
};

firebase.initializeApp(firebaseConfig);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://sustentabilidade-empresarial.firebaseio.com"
});

module.exports = { firebase, admin };
