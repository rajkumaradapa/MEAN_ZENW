const express = require('express');
const AdminMediator = require('../mediators/AdminMediator');

const router = express.Router();

router.post('/Signup_Admin_User', AdminMediator.Signup_Admin_User);

router.route('/Login').post(AdminMediator.Login);

router.route('/Create_Sub_User').post(AdminMediator.Create_Sub_User);

router.route('/Update_Sub_User').post(AdminMediator.Update_Sub_User);

router.route('/Filter_All_Sub_Users').post(AdminMediator.Filter_All_Sub_Users);

router.route('/Update_Password').post(AdminMediator.Update_Password);

router.route('/Update_Admin_Password').post(AdminMediator.Update_Admin_Password);

router.route('/Fetch_Admin_Complete_Information').post(AdminMediator.Fetch_Admin_Complete_Information);

router.route('/Inactivate_Admin').post(AdminMediator.Inactivate_Admin);

router.route('/Activate_Admin').post(AdminMediator.Activate_Admin);

//
//Stores
router.route('/Add_Store').post(AdminMediator.Add_Store);

router.route('/Update_Store').post(AdminMediator.Update_Store);

router.route('/List_All_Store').post(AdminMediator.List_All_Store);

router.route('/Inactive_Store').post(AdminMediator.Inactive_Store);

router.route('/Active_Store').post(AdminMediator.Active_Store);

router.route('/List_SIngle_Store').post(AdminMediator.List_SIngle_Store);

module.exports = router;