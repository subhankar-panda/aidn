var express = require('express');
var router = express.Router();
const request = require('request');
const fs = require('fs');
let admin = require("firebase-admin");
let crypto = require('crypto');
let serviceAccount = require(".credentials.json");

let rawdata = fs.readFileSync('.env.json');
let env_vars = JSON.parse(rawdata);

const subscriptionKey = env_vars.apikey_face;
const uriBase = env_vars.endpoint_face;

let db = admin.firestore();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: env_vars.database_url
});

var genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
};

var sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
};

// imageUrl = 'https://dotesports-media.nyc3.cdn.digitaloceanspaces.com/wp-content/uploads/2019/12/10165716/Reeves.jpg';

// const params = {
//   'returnFaceId': 'true',
//   'returnFaceLandmarks': 'false',
//   'returnFaceAttributes': 'age,gender,headPose,smile,facialHair,glasses,' +
//       'emotion,hair,makeup,occlusion,accessories,blur,exposure,noise'
// };

// const options = {
//   uri: uriBase+"face/v1.0/detect",
//   qs: params,
//   body: '{"url": ' + '"' + imageUrl + '"}',
//   headers: {
//       'Content-Type': 'application/json',
//       'Ocp-Apim-Subscription-Key' : subscriptionKey
//   }
// };

// request.post(options, (error, response, body) => {
//   if (error) {
//     console.log('Error: ', error);
//     return;
//   }
//   let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
//   console.log('JSON Response\n');
//   console.log(jsonResponse);

//   const options2 = {
//     uri: uriBase+'face/v1.0/persongroups/treehacks',
//     body: JSON.stringify({
//       "name": "group2",
//       "userData": "user-provided data attached to the person group.",
//       "recognitionModel": "recognition_02"
//   }),
//     qs: {
//       'personGroupId':"treehacks"
//     },
//     headers: {
//         'Content-Type': 'application/json',
//         'Ocp-Apim-Subscription-Key' : subscriptionKey
//     }
//   };
//   request.put(options2, (error, response, body2) => {
//     if (error) {
//       console.log('Error: ', error);
//       return;
//     }
//     console.log(body2)
//   })
// });

router.get('/', (req, res) => console.log('this is the /api/ handler'))

router.post('/signup', (req, res) => {
    let options = {
        uri: uriBase+"face/v1.0/face/v1.0/persongroups/treehacks/persons",
        body: JSON.stringify({
            "name":req.body.name
        }),
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key' : subscriptionKey
        }
    };

    request.post(options, (error, response, body) => {
        if (error) {
            console.log('Error: ', error);
            return;
        }
        let res = JSON.parse(body);
        personId = res.personId;

        var salt = genRandomString(16); /** Gives us salt of length 16 */
        var hash = sha512(req.body.password, salt);

        ref = admin.storage().ref();
        var meta = { contentData: "image/jpeg" };
        const task = ref.child(name).put(req.body.pic, meta);
        task.then(snapshot => snapshot.ref.getDownloadURL())
            .then(function(url) { 
            //store all the user data to firestore:
            let userref = db.collection('users').doc(personId);
            userref.get().then(doc => {
                if (!doc.exists) {
                    var data = {
                        name: req.body.name,
                        email: req.body.email,
                        salt: salt,
                        hash: hash,
                        picUrl: url, 
                        personGroupId: "treehacks",
                        personId: personId,
                        role: "user"
                    }
                    db.collection('users').doc(personId).set(data).then(ref => {
                        console.log('Added document with pid: ', personId);

                        // create personGroup person
                        let opts = {
                            uri: uriBase+"face/v1.0/face/v1.0/persongroups/treehacks/persons/persistedFaces",
                            body: JSON.stringify({
                                "url":url
                            }),
                            headers: {
                                'Content-Type': 'application/json',
                                'Ocp-Apim-Subscription-Key' : subscriptionKey
                            }
                        };
                        request.post(options, (error, response, body) => {
                            if (error) {
                                console.log('Error: ', error);
                                return;
                            }
                            res.sendStatus(200);
                        });
                    });
                } else {
                    res.sendStatus(500);
                }
            });
        });
    });
});

router.post('/detectFaces', (req, res) => {
  
})

module.exports = router;