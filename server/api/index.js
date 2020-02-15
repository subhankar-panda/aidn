var express = require('express');
var router = express.Router();
const request = require('request');
const fs = require('fs');
let admin = require("firebase-admin");
let crypto = require('crypto');
let serviceAccount = require("../../.credentials.json");
const multer = require("multer");
const path = require('path');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
  }
})
const upload = multer({storage})
let rawdata = fs.readFileSync('.env.json');
let env_vars = JSON.parse(rawdata);

const subscriptionKey = env_vars.apikey_face;
const uriBase = env_vars.endpoint_face;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: env_vars.database_url
});

let db = admin.firestore();

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

router.get('/', (req, res) => console.log('this is the /api/ handler'))

router.post('/signup', upload.single('pic'), (req, res) => {
    req.body = JSON.parse(req.body.body)
    let options = {
        uri: uriBase+"face/v1.0/persongroups/treehacks7/persons",
        body: JSON.stringify({
            "name":req.body.firstName+req.body.lastName
        }),
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key' : subscriptionKey
        }
    };

    request.post(options, (error, response, body) => {
        console.log("more re???")
        console.log(body)
        if (error) {
            console.log('Error: ', error);
            return;
        }
        let getId = JSON.parse(body);
        personId = getId.personId;

        var salt = genRandomString(16); /** Gives us salt of length 16 */
        var hash = sha512(req.body.password, salt);

        ref = admin.storage().bucket('gs://ivory-strategy-268307.appspot.com');
        ref.upload(req.file.path).then((ree) => {
            url = "https://storage.googleapis.com/"+ree[0].metadata.bucket+"/"+ree[0].metadata.name
            let userref = db.collection('users').doc(personId);
            userref.get().then(doc => {
                if (!doc.exists) {
                    var data = {
                        name: req.body.firstName+req.body.lastName,
                        email: req.body.email,
                        salt: salt,
                        hash: hash,
                        picUrl: url, 
                        personGroupId: "treehacks7",
                        personId: personId,
                        role: "user"
                    }
                    db.collection('users').doc(personId).set(data).then(ref => {
                        console.log('Added document with pid: ', personId);

                        // create personGroup person
                        let ps = {
                            "personId":personId
                        }
                        let opts = {
                            uri: uriBase+"face/v1.0/persongroups/treehacks7/persons/{personId}/persistedFaces",
                            qs: ps,
                            body: JSON.stringify({
                                "url":url
                            }),
                            headers: {
                                'Content-Type': 'application/json',
                                'Ocp-Apim-Subscription-Key' : subscriptionKey
                            }
                        };
                        request.post(opts, (error, response, body) => {
                            if (error) {
                                console.log('Error: ', error);
                                return;
                            }
                            console.log('REEEEEEEEEEEEEE')
                            console.log(body)
                            let opt = {
                                uri: uriBase+"face/v1.0/persongroups/treehacks7/train",
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Ocp-Apim-Subscription-Key' : subscriptionKey
                                }
                            };
                            request.post(opt, (error, response, body) => {
                                console.log(response.statusCode)
                                console.log("training..")
                            });
                            res.status(200).send({personId});
                        });
                    });
                } else {
                    res.status(500);
                }
            });
        });
    });
});

router.post('/login', upload.single('pic'), (req, res) => {

});

router.get('/lookup', upload.single('pic'), (req, res) => {
    let ref = admin.storage().bucket('gs://ivory-strategy-268307.appspot.com');
    let url = "https://storage.googleapis.com/ivory-strategy-268307.appspot.com/1581769067697.jpg"
    // do face detect on url and get list of face ids

    const params = {
        'returnFaceId': 'true'
    };

    let options = {
        uri: uriBase+"face/v1.0/detect",
        qs: params,
        body: '{"url": ' + '"' + url + '"}',
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
        let jsonResponse = JSON.parse(body);
        let faceIds = jsonResponse.map(x => x.faceId)
    
        let opts = {
            uri: uriBase+"face/v1.0/identify",
            body: JSON.stringify({
                faceIds: faceIds,
                personGroupId: "treehacks7"
            }),
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key' : subscriptionKey
            }
        };
    
        request.post(opts, (error, response, body) => {
            if (error) {
                console.log('Error: ', error);
                return;
              }
              jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
              console.log('JSON Response\n');
              console.log(jsonResponse);
        });
    });
})

module.exports = router;