const app = require("./app");

const dotenv = require("dotenv");
const connectDatabase = require("../config/database");
// config

dotenv.config({ path: "config/config.env" });

//Connection to database

connectDatabase();

app.listen(process.env.PORT, () => {
  console.log(`server đang hoạt động tại http://localhost:${process.env.PORT}`);
});
