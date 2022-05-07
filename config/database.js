const mongoose = require("mongoose");

const connectDatabase = () => {
  //   mongoose
  //     .connect(process.env.DB_URI, {
  //       useNewUrlParSer: true,
  //       useUnifiedTopology: true,
  //       useCreateindex: true,
  //     })
  //     .then((data) => {
  //       console.log(`Mongodb connected with server: ${data.connection.host}`);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,

      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`Mongodb connected with server: ${data.connection.host}`);
    });
};

module.exports = connectDatabase;
