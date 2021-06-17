let AdminController = function () { };


//packages
const uuid = require("uuid");
const moment = require("moment");
const crypto = require("crypto");
const Boolify = require("node-boolify").Boolify;
const isBoolean = require("node-boolify").isBoolean;


//helpers
const config = require("../config/config");
const ApiMessages = require("../config/ApiMessages");
const CommonMessages = require("../config/CommonMessages");
const CommonController = require("./CommonController");
const ResponseController = require("./ResponseController");

//models
const Admins = require("../models/Admins");
const Store = require("../models/Store");



AdminController.Active_Store = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {
                StoreID: values.StoreID
            }
            let changes = {
                $set: {
                    Status: true,
                    updated_at: new Date()
                }
            };
            let UpdatedStatus = await Store.updateOne(query, changes).lean();
            resolve({ success: true, extras: { Status: CommonMessages.ACTIVATED_SUCCESSFULLY } })
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Inactive_Store = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {
                StoreID: values.StoreID
            }
            let changes = {
                $set: {
                    Status: false,
                    updated_at: new Date()
                }
            };
            let UpdatedStatus = await Store.updateOne(query, changes).lean();
            resolve({ success: true, extras: { Status: CommonMessages.INACTIVATED_SUCCESSFULLY } })
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}


AdminController.List_All_Store = (values) => {
    return new Promise((resolve, reject) => {
        setImmediate(async () => {
            try {
                let query = {

                };
                if (values.Whether_Status_Filter) {
                    query.Status = values.Status
                }
              

                let sortOptions = {
                    created_at: -1
                };
                let toSkip = parseInt(values.skip);
                let toLimit = parseInt(values.limit);
                let Count = await Store.countDocuments(query).lean().exec();
                let Result = await Store.find(query).select('-_id -__v -updated_at -Point -Geometry -Delivery_Pricings').sort(sortOptions).skip(toSkip).limit(toLimit).lean().exec();             
                resolve({ success: true, extras: { Count: Count, Data: Result } })

            } catch (error) {
                reject(await ResponseController.Common_Error_Handler(error));
            }
        });
    });
}


AdminController.Update_Store = (values, Selected_AdminData) => {
    return new Promise(async (resolve, reject) => {
        try {

            let Latitude = parseFloat(values.Latitude) || 0;
            let Longitude = parseFloat(values.Longitude) || 0;
            let Point = [
                Longitude,
                Latitude
            ];

            let query = {
                StoreID: values.StoreID
            }
            let Data = {
                AdminID: Selected_AdminData.AdminID,
                Name: values.Name,
                PhoneNumber: values.PhoneNumber,
                EmailID: values.EmailID,
                Latitude: parseFloat(Latitude),
                Longitude: parseFloat(Longitude),
                Point: [parseFloat(Longitude), parseFloat(Latitude)],
                location: {
                    type: "Point",
                    coordinates: [
                        parseFloat(Longitude),
                        parseFloat(Latitude)
                    ]
                },
                updated_at: new Date()
            }
            let changes = {
                $set: Data
            }
            let UpdatedStatus = await Store.updateOne(query, changes).lean();
            resolve({ success: true, extras: { Status: CommonMessages.UPDATED_SUCCESSFULLY } })

        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Add_Store = (values, Selected_AdminData) => {
    return new Promise(async (resolve, reject) => {
        try {

            let Latitude = parseFloat(values.Latitude) || 0;
            let Longitude = parseFloat(values.Longitude) || 0;
            let Point = [
                Longitude,
                Latitude
            ];

            let Data = {
                StoreID: uuid.v4(),
                AdminID: Selected_AdminData.AdminID,
                Name: values.Name,
                PhoneNumber: values.PhoneNumber,
                EmailID: values.EmailID,
                Latitude: parseFloat(Latitude),
                Longitude: parseFloat(Longitude),
                Point: [parseFloat(Longitude), parseFloat(Latitude)],
                location: {
                    type: "Point",
                    coordinates: [
                        parseFloat(Longitude),
                        parseFloat(Latitude)
                    ]
                },
                created_at: new Date(),
                updated_at: new Date()
            }
            let SaveResult = await Store(Data).save();
            resolve({ success: true, extras: { Status: CommonMessages.CREATED_SUCCESSFULLY } });

        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Activate_Admin = (values, AdminData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let fndupdquery = {
                AdminID: AdminData.AdminID
            };
            let fndupdchanges = {
                $set: {
                    Status: true,
                    updated_at: new Date()
                }
            };
            let fndupdoptions = {
                upsert: true,
                setDefaultsOnInsert: true,
                new: true
            }
            AdminData = await Admins.findOneAndUpdate(fndupdquery, fndupdchanges, fndupdoptions).select('-_id -__v -PasswordHash -PasswordSalt  -updated_at').lean();
            resolve({ success: true, extras: { Status: CommonMessages.ACTIVATED_SUCCESSFULLY } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Inactivate_Admin = (values, AdminData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let fndupdquery = {
                AdminID: AdminData.AdminID
            };
            let fndupdchanges = {
                $set: {
                    Status: false,
                    updated_at: new Date()
                }
            };
            let fndupdoptions = {
                upsert: true,
                setDefaultsOnInsert: true,
                new: true
            }
            AdminData = await Admins.findOneAndUpdate(fndupdquery, fndupdchanges, fndupdoptions).select('-_id -__v -PasswordHash -PasswordSalt  -updated_at').lean();
            resolve({ success: true, extras: { Status: CommonMessages.INACTIVATED_SUCCESSFULLY } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Fetch_Admin_Complete_Information = (AdminData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Data = await CommonController.Fetch_Admin_Complete_Information(AdminData);
            resolve({ success: true, extras: { Data: Data } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Update_Password = (values, AdminData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Old_Password = String(values.Old_Password);
            let New_Password = String(values.New_Password);
            let PasswordSalt = AdminData.PasswordSalt;
            let oldpass = Old_Password + PasswordSalt;
            let newpass = New_Password + PasswordSalt;
            let OldPasswordHash = crypto.createHash('sha512').update(oldpass).digest("hex");
            let NewPasswordHash = crypto.createHash('sha512').update(newpass).digest("hex");
            if (AdminData.PasswordHash === OldPasswordHash) {
                if (OldPasswordHash === NewPasswordHash) {
                    throw { success: false, extras: { code: 2, msg: ApiMessages.OLD_PASSWORD_AND_NEW_PASSWORD_MUST_BE_DIFFERENT } }
                } else {
                    let fndupdquery = {
                        AdminID: AdminData.AdminID
                    };
                    let fndupdchanges = {
                        $set: {
                            PasswordHash: NewPasswordHash,
                            updated_at: new Date()
                        }
                    };
                    let fndupdoptions = {
                        upsert: true,
                        setDefaultsOnInsert: true,
                        new: true
                    }
                    AdminData = await Admins.findOneAndUpdate(fndupdquery, fndupdchanges, fndupdoptions).select('-_id -__v -PasswordHash -PasswordSalt  -updated_at').lean();
                    resolve({ success: true, extras: { Status: CommonMessages.UPDATED_SUCCESSFULLY } });
                }
            } else {
                throw { success: false, extras: { code: 2, msg: ApiMessages.INVALID_OLD_PASSWORD } }
            }
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Filter_All_Sub_Users = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {
                Status: true,
                Admin_Type: 2
            };
            let toSkip = parseInt(values.skip);
            let toLimit = parseInt(values.limit);
            let sortOptions = {
                Name: 1
            };
            if (Boolify(values.Whether_Status_Filter)) {
                query.Status = values.Status

            }

            if (values.sortOptions != null && Object.keys(values.sortOptions).length > 0) {
                sortOptions = values.sortOptions;
            };
            let Count = await Admins.countDocuments(query).lean().exec();
            let Result = await Admins.find(query).select('-_id -__v -updated_at  -Point -Geometry -Delivery_Pricings -PasswordHash -PasswordSalt -SessionID').sort(sortOptions).lean().skip(toSkip).limit(toLimit).exec();
            resolve({ success: true, extras: { Count: Count, Data: Result } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Update_Sub_User = (values, AdminData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let fndupdquery = {
                AdminID: AdminData.AdminID
            };
            let fndupdchanges = {
                $set: {
                    Name: values.Name,
                    EmailID: values.EmailID,
                    Admin_Type: 2,
                    updated_at: new Date()
                }
            };
            let fndupdoptions = {
                upsert: true,
                setDefaultsOnInsert: true,
                new: true
            }
            AdminData = await Admins.findOneAndUpdate(fndupdquery, fndupdchanges, fndupdoptions).select('-_id -__v -PasswordHash -PasswordSalt  -updated_at').lean();
            resolve({ success: true, extras: { Status: CommonMessages.UPDATED_SUCCESSFULLY } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Update_Check_Whether_Admin_Email_Already_Exist = (values, AdminData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {
                AdminID: {
                    $ne: AdminData.AdminID
                },
                EmailID: values.EmailID,
                Status: true
            };
            let Result = await Admins.findOne(query).lean();
            if (Result === null) {
                resolve("Validated Successfully");
            } else {
                throw { success: false, extras: { code: 2, msg: ApiMessages.EMAIL_ALREADY_REGISTERED } }
            };
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Create_Sub_User = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Password = String(values.Password);
            let PasswordSalt = await CommonController.Random_OTP_Number();
            let pass = Password + PasswordSalt;
            let Data = {
                AdminID: uuid.v4(),
                Name: values.Name,
                EmailID: values.EmailID,
                PasswordHash: crypto.createHash('sha512').update(pass).digest("hex"),
                PasswordSalt: PasswordSalt,
                Admin_Type: 2,
                created_at: new Date(),
                updated_at: new Date()
            };
            let SaveResult = await Admins(Data).save();
            resolve({ success: true, extras: { Status: CommonMessages.CREATED_SUCCESSFULLY } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}


AdminController.Login = (values, AdminData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Password = String(values.Password);
            let PasswordSalt = AdminData.PasswordSalt;
            let pass = Password + PasswordSalt;
            let PasswordHash = crypto.createHash('sha512').update(pass).digest("hex");
            if (AdminData.PasswordHash === PasswordHash) {
                let fndupdquery = {
                    AdminID: AdminData.AdminID
                };
                let fndupdchanges = {
                    $set: {
                        SessionID: uuid.v4(),
                        updated_at: new Date()
                    }
                };
                let fndupdoptions = {
                    upsert: true,
                    setDefaultsOnInsert: true,
                    new: true
                };
                AdminData = await Admins.findOneAndUpdate(fndupdquery, fndupdchanges, fndupdoptions).select('-_id -__v -PasswordHash -PasswordSalt  -updated_at').lean();
                resolve({ success: true, extras: { Status: CommonMessages.LOGIN_SUCCESSFULLY, AdminData: AdminData } })
            } else {
                throw { success: false, extras: { code: 2, msg: ApiMessages.INVALID_PASSWORD } }
            }
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Check_Whether_Admin_Email_Registered = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {
                EmailID: values.EmailID,
                Admin_Type: 1
            };
            let Result = await Admins.findOne(query).lean();
            if (Result === null) {
                throw { success: false, extras: { code: 2, msg: ApiMessages.EMAIL_NOT_REGISTERED } }
            } else {
                if (Result.Status) {
                    resolve(Result);
                } else {
                    throw { success: false, extras: { code: 1, msg: ApiMessages.ACCOUNT_NOT_ACTIVE } }
                }
            };
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Signup_Admin_User = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let Password = String(values.Password);
            let PasswordSalt = await CommonController.Random_OTP_Number();
            let pass = Password + PasswordSalt;
            let Data = {
                AdminID: uuid.v4(),
                Name: values.Name,
                EmailID: values.EmailID,
                PasswordHash: crypto.createHash('sha512').update(pass).digest("hex"),
                PasswordSalt: PasswordSalt,
                Admin_Type: 1,
                created_at: new Date(),
                updated_at: new Date()
            };
            let SaveResult = await Admins(Data).save();
            resolve({ success: true, extras: { Status: CommonMessages.CREATED_SUCCESSFULLY } });
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Check_Whether_Admin_Email_Already_Exist = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {
                EmailID: values.EmailID,
                Status: true,
                Admin_Type: 1
            };
            let Result = await Admins.findOne(query).lean();
            if (Result === null) {
                resolve("Validated Successfully");
            } else {
                throw { success: false, extras: { code: 2, msg: ApiMessages.EMAIL_ALREADY_REGISTERED } }
            };
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

AdminController.Check_Whether_Sub_User_Email_Already_Exist = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {
                EmailID: values.EmailID,
                Status: true,
                Admin_Type: 2
            };
            let Result = await Admins.findOne(query).lean();
            if (Result === null) {
                resolve("Validated Successfully");
            } else {
                throw { success: false, extras: { code: 2, msg: ApiMessages.EMAIL_ALREADY_REGISTERED } }
            };
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}


AdminController.Check_Whether_Sub_User_Email_Registered = (values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {
                EmailID: values.EmailID,
                Admin_Type: 2
            };
            let Result = await Admins.findOne(query).lean();
            if (Result === null) {
                throw { success: false, extras: { code: 2, msg: ApiMessages.EMAIL_NOT_REGISTERED } }
            } else {
                if (Result.Status) {
                    resolve(Result);
                } else {
                    throw { success: false, extras: { code: 1, msg: ApiMessages.ACCOUNT_NOT_ACTIVE } }
                }
            };
        } catch (error) {
            reject(await ResponseController.Common_Error_Handler(error));
        }
    });
}

module.exports = AdminController;