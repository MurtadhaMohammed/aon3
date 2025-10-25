const express = require("express");

const app = express();
const PORT = 3000;
const db = require("./db");
const plansRoutes = require("./routes/plan.route");
const clientsRoutes = require("./routes/client.route");

app.use(express.json());

app.get("/", async (req, res) => {
  res.send("Server is live ...");
});

app.use("/plans", plansRoutes);
app.use("/client", clientsRoutes);

app.listen(PORT, () => {
  console.log("http://localhost:3000");
});

process.on("SIGINT", async () => {
  await db.end();
  process.exit(0);
});
