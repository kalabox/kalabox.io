var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {res.render('services.twig', req.query);});
router.get('/sponsor', function (req, res) {res.render('sponsor.twig', req.query);});

module.exports = router;