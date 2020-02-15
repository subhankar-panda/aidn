var express = require('express')
var router = express.Router()

router.get('/', (req, res) => console.log('this is the /api/ handler'))

module.exports = router;