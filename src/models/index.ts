import * as db from "mongoose";
import envConfig from "../config/env.config";

db.connect(envConfig.dbUrl)
    .then(() => console.log("DB Connected"))
    .catch(err => console.log(err));

// index.Mongoose.connect('mongodb://my_name:my_pwd@127.0.0.1:27017/gl')
// .then(() => console.log("DB Connected"))
//     .catch(err => console.log(err));
export default db;
