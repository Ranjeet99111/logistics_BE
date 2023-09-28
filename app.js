import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes/user-routes.js";
import oRouter from "./routes/order-routes.js";
import rRouter from "./routes/return-routes.js";

import fs from "fs";

const app = express();
const port = 3050;

app.use(cors());

app.use(express.json());
app.use("/api/users", router);
app.use("/api/orders", oRouter);
app.use("/api/returns", rRouter);

// app.use("api/user",router)
// app.use("/api", (req, res, next) => {
//   res.send("hello bharat");
//   console.log("hello mitro")
// });

// "mongodb+srv://ryadav:ibrIoy8smrNHeRBf@clustertodo.jfkxu97.mongodb.net/?retryWrites=true&w=majority"

app.get("/readFile", (req, res) => {
  fs.readFile("read.txt", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).json({ error: "Error reading file" });
    } else {
      const parsedData = JSON.parse(data);
      res.json(parsedData);
    }
  });
});

mongoose
  .connect(
    "mongodb+srv://rnjtydv9:WevHwplyTBDfr3Cy@unknown.ritibzx.mongodb.net/"
  )
  .then(() =>
    app.listen(port, () => console.log(`server is running on port no: ${port}`))
  )
  .then(() => console.log("connected..."))
  .catch((err) => console.log("error" + err));
