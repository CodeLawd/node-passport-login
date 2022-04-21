const mongoose = require("mongoose");

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/node_passport_db2", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected!!!"))
  .catch((err) => console.log(err));
