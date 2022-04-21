const mongoose = require("mongoose");

// Connect to MongoDB
mongoose
  .connect(
    process.env.MONGODB_URI_CLOUD,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB Connected!!!"))
  .catch((err) => console.log(err.message));
