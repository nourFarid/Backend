const mongoose = require("mongoose");
const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.connection, {
      useNewUrlParser: true,
      // useFindAndModify: false,
      // useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log(
      "DB connected",
      "\n",
      "HOST: ",
      connect.connection.host,
      "\n",
      "NAME: ",
      connect.connection.name
    );
    // mongoose.connection.once("open", () => {
    //   console.log("connected once");
    //   mongoose.connection.on("error", (err) => {
    //     console.error(err);
    //   });
    // });
  } catch (error) {
    console.log("====================================");
    console.log(error);
    process.exit(1);
    console.log("====================================");
  }
};
module.exports = connectDb;
