let CommonController = function () { };

//Dependencies
const uuid = require("uuid");
const moment = require("moment");
const axios = require("axios");
const mongoose = require("mongoose");
const validator = require("validator");
const Boolify = require("node-boolify").Boolify;
const isBoolean = require("node-boolify").isBoolean;

//models or Common files
const ApiMessages = require("../config/ApiMessages");
const CommonMessages = require("../config/CommonMessages");
const config = require("../config/config");

const ResponseController = require("./ResponseController");

//models
const Admins = require("../models/Admins");
const Store = require("../models/Store");


CommonController.Check_for_Store = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {
                StoreID: values.StoreID
            };
            let Result = await Store.findOne(query).lean();
            if (Result === null) {
                throw { success: false, extras: { code: 2, msg: ApiMessages.INVALID_STOORE } }
            } else {
                resolve(Result);
            }
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
};

CommonController.Common_Validate_Admin_Selected_Admin = (AdminData, Selected_AdminData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (AdminData.AdminID === Selected_AdminData.AdminID) {
                throw { success: false, extras: { code: 2, msg: ApiMessages.ADMIN_AND_SELECTED_ADMIN_MUST_BE_DIFFERENT } }
            } else {
                resolve("Validated Successfully");
            }
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

CommonController.Check_Only_Admin = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {
                AdminID: values.AdminID
            }
            let Result = await Admins.findOne(query).select('-_id -__v').lean();
            if (Result === null) {
                throw { success: false, extras: { code: 1, msg: ApiMessages.INVALID_ADMIN } }
            } else {
                resolve(Result);
            }
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

CommonController.Random_OTP_Number = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let charBank = "123456789";
            let str = '';
            for (let i = 0; i < 4; i++) {
                str += charBank[parseInt(Math.random() * charBank.length)];
            };
            resolve(str);
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

CommonController.Common_Password_Validation = (Password) => {
    return new Promise(async (resolve, reject) => {
        try {
            //Step 1 ---> Validate one Uppercase
            //Step 2 ---> Validate one Lowercase
            //Step 3 ---> Validate one Number
            //Step 4 ---> Validate Password Length(6 to 16)
            //Step 5 ---> Validate Complete Password at once
            if (config.Password_UpperCase.test(Password)) {
                if (config.Password_LowerCase.test(Password)) {
                    if (config.Password_Digits.test(Password)) {
                        if (config.Password_Length.test(Password)) {
                            if (config.Password_Match_Regex.test(Password)) {
                                resolve({ success: true, extras: { Status: CommonMessages.VALIDATED_SUCCESSFULLY } })
                            } else {
                                throw { success: false, extras: { code: 2, msg: ApiMessages.INVALID_PASSWORD } }
                            }
                        } else {
                            throw { success: false, extras: { code: 2, msg: ApiMessages.PASSWORD_MUST_BE_BETWEEN_6_AND_16_CHARACTERS } }
                        }
                    } else {
                        throw { success: false, extras: { code: 2, msg: ApiMessages.PASSWORD_MUST_HAVE_ATLEAST_ONE_NUMBER } }
                    }
                } else {
                    throw { success: false, extras: { code: 2, msg: ApiMessages.PASSWORD_MUST_HAVE_ATLEAST_ONE_LOWERCASE } }
                }
            } else {
                throw { success: false, extras: { code: 2, msg: ApiMessages.PASSWORD_MUST_HAVE_ATLEAST_ONE_UPPERCASE } }
            }
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

CommonController.Check_for_Admin = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = new Object();
            if (config.AdminID === values.AdminID) {
                query = {
                    Status: true
                };
            } else {
                query = {
                    AdminID: values.AdminID
                };
            }
            query.Admin_Type = 1

            let Result = await Admins.findOne(query).select('-_id -__v').lean();
            if (Result === null) {
                throw { success: false, extras: { code: 1, msg: ApiMessages.INVALID_ADMIN } }
            } else {
                if (Result.SessionID != "") {
                    if (Result.SessionID === values.SessionID || config.SECRET_SESSIONID === values.SessionID || config.SessionID === values.SessionID) {
                        if (Result.Status) {
                            resolve(Result);
                        } else {
                            throw { success: false, extras: { code: 1, msg: ApiMessages.ACCOUNT_NOT_ACTIVE } }
                        }
                    } else {
                        throw { success: false, extras: { code: 1, msg: ApiMessages.SESSION_EXPIRED } }
                    }
                } else {
                    throw { success: false, extras: { code: 1, msg: ApiMessages.SESSION_EXPIRED } }
                }
            }
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

CommonController.Common_Phone_Number_Validation = PhoneNumber => {
    return new Promise(async (resolve, reject) => {
        try {
            if (PhoneNumber === null || PhoneNumber === undefined || PhoneNumber === "") {
                resolve("Validated Successfully");
            } else {
                if (validator.isMobilePhone(String(PhoneNumber), "en-IN")) {
                    resolve("Validated Successfully");
                } else {
                    throw { success: false, extras: { code: 2, msg: ApiMessages.INVALID_PHONENUMBER } }
                }
            }
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}


CommonController.Common_Email_Validation = EmailID => {
    return new Promise(async (resolve, reject) => {
        try {
            if (EmailID === null || EmailID === undefined || EmailID === "") {
                resolve("Validated Successfully");
            } else {
                if (validator.isEmail(EmailID)) {
                    resolve("Validated Successfully");
                } else {
                    throw { success: false, extras: { code: 2, msg: ApiMessages.INVALID_EMAIL_FORMAT } }
                }
            }
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}


module.exports = CommonController;