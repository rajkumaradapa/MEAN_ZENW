let config = function () { };

//Host Name
config.host = '';

config.Password_UpperCase = /(?=.*[A-Z])/;
config.Password_LowerCase = /(?=.*[a-z])/;
config.Password_Digits = /(?=.*[0-9])/;
config.Password_Length = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
config.Password_Match_Regex = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
config.Sub_URL_Regex = /^[a-z-_]*$/;
config.Axios_Timeout = 300000;//5 minutes

// config.MongoURL = `mongodb+srv://gharsekhana:gharsekhana123@cluster0.7cs2w.mongodb.net/gharsekhana?retryWrites=true&w=majority`;
config.MongoURL = `mongodb+srv://raj:raj@123@cluster0.wuzb9.mongodb.net/MeanZEn?retryWrites=true&w=majority`;

//ports
config.port = 3000;



module.exports = config;