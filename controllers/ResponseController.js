
const ResponseController = function () { };

const ApiMessages = require("../config/ApiMessages");
const CommonMessages = require("../config/CommonMessages");
const config = require("../config/config");


ResponseController.Common_Response_Handler = (res, Result) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (Result.success) {
                if (!res.headersSent) {
                    resolve(res.status(200).json(Result));
                } else {
                    resolve("Already Sent");
                }
            } else if (!Result.success) {
                if (!res.headersSent) {
                    resolve(res.status(400).json(await ResponseController.Common_Error_Handler(Result)));
                } else {
                    resolve("Already Sent");
                }
            } else {
                if (!res.headersSent) {
                    resolve(res.status(400).json({ success: false, extras: { code: 2, msg: ApiMessages.SERVER_ERROR } }));
                    throw Result;
                } else {
                    resolve("Already Sent");
                }
            }
        } catch (error) {
            console.error('Something Response Handler--->', error);
        }
    });
}

ResponseController.Common_Error_Handler = (error) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.error("Common_Error_Handler---------->", error);
            if (error.success === null || error.success === undefined) {
                if (error instanceof SyntaxError) {
                    resolve({ success: false, extras: { code: 2, msg: ApiMessages.SERVER_ERROR } })
                } else {
                    resolve({ success: false, extras: { code: 2, msg: ApiMessages.DATABASE_ERROR } })
                }
            } else {
                resolve(error);
            }
        } catch (error) {
            console.error('Something Error Handler--->', error);
        }
    });
};

module.exports = ResponseController;