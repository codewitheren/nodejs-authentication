require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();


// express.json(): Bu middleware, gelen isteklerin içeriğini JSON formatında işler. Yani istemcinin gönderdiği verileri otomatik olarak JSON nesnelerine dönüştürür. Bu özellikle API'lar için çok yaygın bir gereksinimdir, çünkü istemciler genellikle verileri JSON olarak gönderirler. Bu middleware olmadan, gelen verileri elle ayrıştırmanız gerekebilir.
// express.urlencoded({ extended: true }): Bu middleware, gelen isteklerin içeriğini URL kodlanmış (form verileri gibi) verilere dönüştürür. { extended: true } seçeneği, işlem sırasında karmaşık nesneleri (örneğin, daha derin nesneler içeren diziler) destekler. Bu middleware, web formlarından veya benzeri veri gönderimlerinden gelen istekleri işlemek için kullanışlıdır.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

db.once("open", () => {
  console.log("MongoDB connection successfully established");
});

app.use("/user", require("./routes/user"));
app.use("/post", require("./routes/post"));


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(
    "Server listening on port " + `http://127.0.0.1:${process.env.PORT}`
  );
});
