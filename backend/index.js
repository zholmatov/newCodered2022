const express = require("express");
const compareImages = require("./compareImages");

const app = express();

app.post("/post", (req, res) => {
  console.log("Connected to React");
  res.redirect("/");
});

app.get("/get-images/:image", async (req, res) => {
  const data = await compareImages(
    "/Users/fernandoramirez/Desktop/codered/" + req.params.image
  );
  res.send(data);
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
