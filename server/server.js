const app = require("./app");

const dotenv = require("dotenv");
const connectDatabase = require("../config/database");

//api swagger
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Callmelinh Blog API",
      version: "1.0.0",
      description:
        "Đây chỉ là link api chưa kết hợp với trả về kết quả trên web. " +
        "This is only link api is not results with return on results on web.",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
// Handling Uncaught Exception

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(
    `Shutting down the server due to Unhandled Promise Rejection :Máy chủ gặp sự cố nên không thể xử lý được yêu cầu của bạn. Vui lòng thử lại sau!`
  );
  process.exit(1);
});

// config

dotenv.config({ path: "config/config.env" });

//Connection to database

connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`server đang hoạt động tại http://localhost:${process.env.PORT}`);
});

//Unhandled Promise Rehection

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}  `);
  console.log(
    `Shutting down the server due to Uncaught Exception :Máy chủ gặp sự cố nên không thể xử lý được yêu cầu của bạn. Vui lòng thử lại sau!`
  );

  server.close(() => {
    process.exit(1);
  });
});
