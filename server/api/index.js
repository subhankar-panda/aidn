var express = require('express')
var router = express.Router()
const request = require('request');
const fs = require('fs');
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

router.post('/signup', upload.single('pic'), (req, res) => {
    console.log(req.body)
    console.log(req.file, req.files)
});

router.post('/detectFaces', (req, res) => {
  
})

module.exports = router;