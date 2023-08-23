const express = require("express")
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan")
const dotenv = require("dotenv");
const userRoutes= require("./routes/userRoutes")
const tweetRoutes = require('./routes/tweetRoutes');



dotenv.config();
mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("Connected to DB..."))
  .catch((err) => console.log(`DB Error: ${err.message}`));

  
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'))



app.use('/api/v1',userRoutes);
app.use('/api/v1',tweetRoutes)


const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`App is running on port ${port}.....`);
});