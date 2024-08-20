import mongoose from "mongoose";

const dbConnect = () => {
  try {
    const conn = mongoose.connect("mongodb://localhost:27017/sypher");
    console.log("Database connected successfully");
  } catch (err) {
    console.log(error.response.data);
  }
};

module.exports=dbConnect;