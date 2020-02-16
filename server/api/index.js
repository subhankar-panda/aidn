var express = require('express');
var router = express.Router();
const request = require('request');
let admin = require("firebase-admin");
let crypto = require('crypto');
let serviceAccount = {
    "type": "service_account",
    "project_id": "ivory-strategy-268307",
    "private_key_id": process.env.GOOG_PRIVATE_KEY_ID,
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCnfeXIcfT/dAAN\nAg2TUY6CVYtN8nIOL2wVoy/eskS9wYrySA+zQHoLDzXf0SeFWWMIvVUcMT9ym88n\nxJk/x6NEw5UVXHiQPXjJxxrDQ1wb05JoPIKYpuinGBlM9VeGC+LonLenpXn/zf3m\ntqIVvD8fhivzCTSgXfWn9IKMyXIklWCCTlxMUv6afqdfPZMbEWbdJOe4WHpHbvN5\n1yfXDjNPXIPwIaQCX0huJF38vLfrigH5bD2sPQW8PaLzIfSoPj2TXfD/IX6T6SA2\n6iFtE8IKU9Etz3N6vCBFa90Qy0f3LrpHjH8Iwk7aVxVB3tjyjLfJOtTjkM9G5Plo\ntpffUwm3AgMBAAECggEAUO6dP0+NTniLY723uJVCksjqILaDlUYl6IirY2TpoXVp\ngev/JiMENd7aLfW/LojEOV9fRlmnqmYOYc12LaL2Sg5lteYyXaROftWmIW8ljU6c\n4qBGjKOuLLuQ0iaE7cFFmhfMCIaFnm03gCmExZLqP33SM8QheVIdl1QnVwcqD/GS\nprdwnenMird3kAvXOSjVcbNmox2ogBsaFCEThVJXkB/NCkzP+N+HYaTPJiS8mTgb\nYzel+vHqAXxerP8NzKaEYjVaQP6XV1IIMG4bg1b/Uzd8JwdEdkcBAoaz/CY47Hwo\nFqkBOc01xnffvPcQgSHmufy8mGMp9js1f2UdTjxGsQKBgQDpCYcIqgutEHbcpFf7\nIzj4KTm8vvPma1W5QEZkCyopTcttTMz6MyJyUD2nGRVD400oSQfeIoO2lLrULGtL\nRexgAmLHvIj2TSghfCi0wB0wAp2Ct7ejI1CThDNbhjO1s8fdrog62E2C6hHa2ZIm\n4jKK5E9Sv+VvVkhCdtXRUXdpJwKBgQC3/vTBjZ7gbHiiWbMedzVXSpCvW4vggpVn\nfDysguW94BaFhXcwGGjx1d8LW/5RYWcMRqxeIGcAm2NTy6KDkctncfcFwJ5Xjgoj\nk6Fy31i6omKCQmicA26DqwlZEe276hbSSsdrRd8LQ1tGjQbbr9FlMCNHeQa5pAoG\nS+iac/4U8QKBgQClPRI4vIqG7rO5g/a2pqUQofrEsQm0istADilbauc8XmMuX1TA\n3F1CfU8aGxkPCC9/rzka85I9dnx7UfvKZgxTj52HT1I2g0M/axBaChcoIdKaC7b0\nwGe0EftwnFoyLwY7VDRYtWNQvrRmX/vYAnAgN/9fB56iMaYPKsA2KfPn5QKBgQCA\nv+w+4D2TZvPHDyNypxHxQiEaQ+IOOPIY1uuR/4qJohvAVNNBGWOeDf0kcrvz8Edu\nZKnKt7u7xf/sK+tNS6DcgvfK0605MRBRMsXfnv/0oRpzccrHmPMlOXKyHASR4M0V\nW/RNUTgxJnHhXV+2LEJHHzcglUSqdGn7W/So14+s0QKBgBlo59RFdjuwR+/MLq2X\nYIyqZc8TAOhYjaAvMt0st82+CpjbPT7rqTy7eYFE+g/kvg6Kxnlk6dEnWii5SFVY\nswcpFP/nVNUyMsto+Cf87iY5ZDN0dhU993ggR+GNhMU/TUaHvxB+EXyr9kctv8Or\nMTEcG1sMAscZIS3fV74nAwES\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-a93xp@ivory-strategy-268307.iam.gserviceaccount.com",
    "client_id": "110187577300795259178",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-a93xp%40ivory-strategy-268307.iam.gserviceaccount.com"
  }
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
const subscriptionKey = process.env.API_KEY_FACE;
const uriBase = process.env.ENDPOINT_FACE;
console.log(subscriptionKey, uriBase)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL
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
                        name: req.body.firstName+ ' ' + req.body.lastName,
                        email: req.body.email,
                        salt: salt,
                        hash: hash,
                        picUrl: url, 
                        personGroupId: "treehacks7",
                        personId: personId,
                        role: "user",
                        contactName: req.body.firstNameContact + ' ' + req.body.lastNameContact,
                        contactNumber: req.body.phoneNumber,
                        contactEmail: req.body.contactEmail
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

router.post('/login', (req, res) => {

});

router.get('/lookup', upload.single('pic'), (req, res) => {
    let ref = admin.storage().bucket('gs://ivory-strategy-268307.appspot.com');
    ref.upload(req.file.path).then((ree) => {
        url = "https://storage.googleapis.com/"+ree[0].metadata.bucket+"/"+ree[0].metadata.name
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
                  jsonResponse = JSON.parse(body);
                  res.send(jsonResponse)
            });
        });
    });
});

router.post('/history', (req,res) => {
    console.log(req.body, typeof req.body)
    let trialref = db.collection('trial').get().then(snap => {
        size = snap.size;
        db.collection('trial').doc('trial'+size).set(req.body).then(ref => {
            console.log('Added document: ', 'trial'+size);
            res.send(200);
        });
    });
})


module.exports = router;