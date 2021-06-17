let AdminMediator = function () { };

const CommonController = require("../controllers/CommonController");
const AdminController = require("../controllers/AdminController");
const ApiMessages = require("../config/ApiMessages");
const Boolify = require("node-boolify").Boolify;
const isBoolean = require("node-boolify").isBoolean;
const ResponseController = require("../controllers/ResponseController");


// AdminMediator.List_SIngle_Store = async (req, res) => {
//     try {
//         let values = JSON.parse(JSON.stringify(req.body));
//         if (
//             req.body.AdminID != null && req.body.SessionID != null
//             && values.StoreID != null && values.StoreID != ''
//         ) {
//             let AdminData = await CommonController.Check_for_Admin(req.body);
//             let Store_Data = await CommonController.Check_for_Store(req.body);
//             let Result = { success: true, extras: { Status: Store_Data } }
//             await ResponseController.Common_Response_Handler(res, Result);
//         } else {
//             throw { success: false, extras: { msg: ApiMessages.ENTER_ALL_TAGS } };
//         }
//     } catch (error) {
//         await ResponseController.Common_Response_Handler(res, error);
//     }
// }

// AdminMediator.Active_Store = async (req, res) => {
//     try {
//         let values = JSON.parse(JSON.stringify(req.body));
//         if (
//             req.body.AdminID != null && req.body.SessionID != null
//             && values.StoreID != null && values.StoreID != ''
//         ) {
//             let AdminData = await CommonController.Check_for_Admin(req.body);
//             let Store_Data = await CommonController.Check_for_Store(req.body);
//             let Result = await AdminController.Active_Store(req.body);
//             await ResponseController.Common_Response_Handler(res, Result);
//         } else {
//             throw { success: false, extras: { msg: ApiMessages.ENTER_ALL_TAGS } };
//         }
//     } catch (error) {
//         await ResponseController.Common_Response_Handler(res, error);
//     }
// }

// AdminMediator.Inactive_Store = async (req, res) => {
//     try {
//         let values = JSON.parse(JSON.stringify(req.body));
//         if (
//             req.body.AdminID != null && req.body.SessionID != null
//             && values.StoreID != null && values.StoreID != ''
//         ) {
//             let AdminData = await CommonController.Check_for_Admin(req.body);
//             let Store_Data = await CommonController.Check_for_Store(req.body);
//             let Result = await AdminController.Inactive_Store(req.body);
//             await ResponseController.Common_Response_Handler(res, Result);
//         } else {
//             throw { success: false, extras: { msg: ApiMessages.ENTER_ALL_TAGS } };
//         }
//     } catch (error) {
//         await ResponseController.Common_Response_Handler(res, error);
//     }
// }

// AdminMediator.List_All_Store = async (req, res) => {
//     try {
//         if (
//             req.body.AdminID != null && req.body.SessionID != null
//             & req.body.skip != null && isFinite(req.body.skip)
//             && req.body.limit != null && isFinite(req.body.limit)
//             && req.body.Whether_Status_Filter != null && isBoolean(req.body.Whether_Status_Filter)
//         ) {
//             let AdminData = await CommonController.Check_for_Admin(req.body);
//             let Result = await AdminController.List_All_Store(req.body);
//             await ResponseController.Common_Response_Handler(res, Result);
//         } else {
//             throw { success: false, extras: { msg: ApiMessages.ENTER_ALL_TAGS } };
//         }
//     } catch (error) {
//         await ResponseController.Common_Response_Handler(res, error);
//     }
// }

// AdminMediator.Update_Store = async (req, res) => {
//     try {
//         let values = JSON.parse(JSON.stringify(req.body));
//         if (
//             values.AdminID != null && values.SessionID != null
//             && values.StoreID != null && values.StoreID != ''
//             && values.Name != null && values.Name != ''
//             && values.EmailID != null && values.EmailID != ''
//             && values.PhoneNumber != null && values.PhoneNumber != ''
//             && req.body.Latitude != null && req.body.Longitude != null
//             && values.Selected_AdminID != null && values.Selected_AdminID != ''

//         ) {
//             let AdminData = await CommonController.Check_for_Admin(values);
//             let Selected_AdminData = await CommonController.Check_Only_Admin({ AdminID: values.Selected_AdminID });
//             if (Selected_AdminData.Admin_Type === 2) {
//                 let Store_Data = await CommonController.Check_for_Store(req.body);
//                 let Result = await AdminController.Update_Store(values, Selected_AdminData);
//                 await ResponseController.Common_Response_Handler(res, Result);
//             } else {
//                 throw { success: false, extras: { code: 2, msg: ApiMessages.SELCTED_ADMIN_NOT_A_SUB_USER } };

//             }

//         } else {
//             throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
//         }
//     } catch (error) {
//         await ResponseController.Common_Response_Handler(res, error);
//     }
// }

AdminMediator.Add_Product = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && values.StoreID != null && values.StoreID != ''
            && values.Name != null && values.Name != ''
            && values.Category != null && values.Category != ''
            && values.Description != null && values.Description != ''
            && req.body.Available_Qty != null
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);

            if (AdminData.Admin_Type === 2) {
                let Store_Data = await CommonController.Check_for_Store(req.body);
                let Result = await AdminController.Add_Product(values, AdminData);
                await ResponseController.Common_Response_Handler(res, Result);
            } else {
                throw { success: false, extras: { code: 2, msg: ApiMessages.SELCTED_ADMIN_NOT_A_SUB_USER } };

            }
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AdminMediator.Sub_User_Login = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.EmailID != null && values.EmailID != ''
            && values.Password != null && values.Password != ''
        ) {
            let ValidityStatus = CommonController.Common_Email_Validation(values.EmailID);
            let AdminData = await AdminController.Check_Whether_Sub_User_Email_Registered(values);
            let Result = await AdminController.Sub_User_Login(values, AdminData);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AdminMediator.List_SIngle_Store = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            req.body.AdminID != null && req.body.SessionID != null
            && values.StoreID != null && values.StoreID != ''
        ) {
            let AdminData = await CommonController.Check_for_Admin(req.body);
            let Store_Data = await CommonController.Check_for_Store(req.body);
            let Result = { success: true, extras: { Status: Store_Data } }
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AdminMediator.Active_Store = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            req.body.AdminID != null && req.body.SessionID != null
            && values.StoreID != null && values.StoreID != ''
        ) {
            let AdminData = await CommonController.Check_for_Admin(req.body);
            let Store_Data = await CommonController.Check_for_Store(req.body);
            let Result = await AdminController.Active_Store(req.body);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AdminMediator.Inactive_Store = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            req.body.AdminID != null && req.body.SessionID != null
            && values.StoreID != null && values.StoreID != ''
        ) {
            let AdminData = await CommonController.Check_for_Admin(req.body);
            let Store_Data = await CommonController.Check_for_Store(req.body);
            let Result = await AdminController.Inactive_Store(req.body);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AdminMediator.List_All_Store = async (req, res) => {
    try {
        if (
            req.body.AdminID != null && req.body.SessionID != null
            & req.body.skip != null && isFinite(req.body.skip)
            && req.body.limit != null && isFinite(req.body.limit)
            && req.body.Whether_Status_Filter != null && isBoolean(req.body.Whether_Status_Filter)
        ) {
            let AdminData = await CommonController.Check_for_Admin(req.body);
            let Result = await AdminController.List_All_Store(req.body);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AdminMediator.Update_Store = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && values.StoreID != null && values.StoreID != ''
            && values.Name != null && values.Name != ''
            && values.EmailID != null && values.EmailID != ''
            && values.PhoneNumber != null && values.PhoneNumber != ''
            && req.body.Latitude != null && req.body.Longitude != null
            && values.Selected_AdminID != null && values.Selected_AdminID != ''

        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let Selected_AdminData = await CommonController.Check_Only_Admin({ AdminID: values.Selected_AdminID });
            if (Selected_AdminData.Admin_Type === 2) {
                let Store_Data = await CommonController.Check_for_Store(req.body);
                let Result = await AdminController.Update_Store(values, Selected_AdminData);
                await ResponseController.Common_Response_Handler(res, Result);
            } else {
                throw { success: false, extras: { code: 2, msg: ApiMessages.SELCTED_ADMIN_NOT_A_SUB_USER } };

            }

        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AdminMediator.Add_Store = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && values.Selected_AdminID != null && values.Selected_AdminID != ''
            && values.Name != null && values.Name != ''
            && values.EmailID != null && values.EmailID != ''
            && values.PhoneNumber != null && values.PhoneNumber != ''
            && req.body.Latitude != null && req.body.Longitude != null
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let Selected_AdminData = await CommonController.Check_Only_Admin({ AdminID: values.Selected_AdminID });

            if (Selected_AdminData.Admin_Type === 2) {
                let Result = await AdminController.Add_Store(values, Selected_AdminData);
                await ResponseController.Common_Response_Handler(res, Result);
            } else {
                throw { success: false, extras: { code: 2, msg: ApiMessages.SELCTED_ADMIN_NOT_A_SUB_USER } };

            }
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AdminMediator.Activate_Admin = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && values.Selected_AdminID != null
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let Selected_AdminData = await CommonController.Check_Only_Admin({ AdminID: values.Selected_AdminID });
            let ValidityStatus = await CommonController.Common_Validate_Admin_Selected_Admin(AdminData, Selected_AdminData);
            let Result = await AdminController.Activate_Admin(values, Selected_AdminData);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AdminMediator.Inactivate_Admin = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && values.Selected_AdminID != null
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let Selected_AdminData = await CommonController.Check_Only_Admin({ AdminID: values.Selected_AdminID });
            let ValidityStatus = await CommonController.Common_Validate_Admin_Selected_Admin(AdminData, Selected_AdminData);
            let Result = await AdminController.Inactivate_Admin(values, Selected_AdminData);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AdminMediator.Fetch_Admin_Complete_Information = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && values.Selected_AdminID != null
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let Selected_AdminData = await CommonController.Check_Only_Admin({ AdminID: values.Selected_AdminID }); s
            let Result = await AdminController.Fetch_Admin_Complete_Information(values, Selected_AdminData);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AdminMediator.Update_Admin_Password = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && values.Selected_AdminID != null
            && values.Password != null && values.Password != ''
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let Selected_AdminData = await CommonController.Check_Only_Admin({ AdminID: values.Selected_AdminID });
            let ValidityStatus = await CommonController.Common_Validate_Admin_Selected_Admin(AdminData, Selected_AdminData);
            ValidityStatus = await CommonController.Common_Password_Validation(values.Password);
            let Result = await AdminController.Update_Admin_Password(values, Selected_AdminData);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AdminMediator.Update_Password = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && values.Old_Password != null && values.Old_Password != ''
            && values.New_Password != null && values.New_Password != ''
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let ValidityStatus = await CommonController.Common_Password_Validation(values.New_Password);
            let Result = await AdminController.Update_Password(values, AdminData);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AdminMediator.Filter_All_Sub_Users = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && CommonController.isNumber(values.skip)
            && CommonController.isNumber(values.limit)
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let Result = await AdminController.Filter_All_Sub_Users(values);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AdminMediator.Update_Sub_User = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && values.Selected_AdminID != null
            && values.Name != null && values.Name != ''
            && values.EmailID != null && values.EmailID != ''
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let ValidityStatus = await CommonController.Common_Email_Validation(values.EmailID);
            let Selected_AdminData = await CommonController.Check_Only_Admin({ AdminID: values.Selected_AdminID });
            ValidityStatus = await AdminController.Update_Check_Whether_Admin_Email_Already_Exist(values, Selected_AdminData);
            let Result = await AdminController.Update_Sub_User(values);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AdminMediator.Create_Sub_User = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && values.Name != null && values.Name != ''
            && values.EmailID != null && values.EmailID != ''
            && values.Password != null && values.Password != ''
        ) {
            let AdminData = await CommonController.Check_for_Admin(values);
            let ValidityStatus = await CommonController.Common_Email_Validation(values.EmailID);
            ValidityStatus = await AdminController.Check_Whether_Sub_User_Email_Already_Exist(values);
            ValidityStatus = await CommonController.Common_Password_Validation(values.Password);
            let Result = await AdminController.Create_Sub_User(values);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AdminMediator.Login = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.EmailID != null && values.EmailID != ''
            && values.Password != null && values.Password != ''
        ) {
            let ValidityStatus = CommonController.Common_Email_Validation(values.EmailID);
            let AdminData = await AdminController.Check_Whether_Admin_Email_Registered(values);
            let Result = await AdminController.Login(values, AdminData);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}

AdminMediator.Signup_Admin_User = async (req, res) => {
    try {
        let values = JSON.parse(JSON.stringify(req.body));
        if (
            values.AdminID != null && values.SessionID != null
            && values.Name != null && values.Name != ''
            && values.EmailID != null && values.EmailID != ''
            && values.Password != null && values.Password != ''
        ) {
            // let AdminData = await CommonController.Check_for_Admin(values);
            let ValidityStatus = await CommonController.Common_Email_Validation(values.EmailID);
            ValidityStatus = await AdminController.Check_Whether_Admin_Email_Already_Exist(values);
            ValidityStatus = await CommonController.Common_Password_Validation(values.Password);
            let Result = await AdminController.Signup_Admin_User(values);
            await ResponseController.Common_Response_Handler(res, Result);
        } else {
            throw { success: false, extras: { code: 2, msg: ApiMessages.ENTER_ALL_TAGS } };
        }
    } catch (error) {
        await ResponseController.Common_Response_Handler(res, error);
    }
}


module.exports = AdminMediator;