const connectToMongo=require("./db");
const express = require('express');
const cors =require('cors')
connectToMongo();
const app = express()
const port = 5000
app.use(cors())
app.use(express.json());
app.use("/auth",require("./routes/auth"));
app.use("/notes",require("./routes/notes"));
app.listen(port, () => {
  console.log(`iNootebook backend listening on port http://localhost:${port}`)
})
