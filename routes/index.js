var express = require('express');
var router = express.Router();
var path = require('path');
/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('login', { title: 'login', content:'đây là trang login' });
  res.sendFile(path.join(__dirname, '../public', 'login.html'));
});

module.exports = router;
