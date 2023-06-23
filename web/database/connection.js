import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config();
// eslint-disable-next-line no-undef
const apiKey =
  "mongodb+srv://navasMuhammed:kunjattu%4027@cluster0.zb5zevl.mongodb.net/?retryWrites=true&w=majority";

export async function connect() {
  try {
    await mongoose.connect(apiKey, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongoose connected to db");
  } catch (error) {
    console.log(error);
  }
}
