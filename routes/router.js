const express = require('express');
let router = express.Router();
const AdminRouter = require('./admin');
const CommonController = require('../controllers/CommonController');


//Admin Dashboard Api's
router.use('/admin', AdminRouter);


module.exports = router;