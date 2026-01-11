require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const fs = require("fs");
const explainError = require("./hfExplain");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/run", async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.json({ error: "No code provided" });
  }

  fs.writeFileSync("temp.py", code);

  exec("python temp.py", async (error, stdout, stderr) => {
    if (error) {
      try {
        const explanation = await explainError(stderr || error.message);
        return res.json({
          error: stderr || error.message,
          explanation,
        });
      } catch (e) {
        return res.json({
          error: stderr || error.message,
          explanation: "AI explanation failed",
        });
      }
    }
    if (stderr) {
      return res.json({ output: stderr });
    }
    res.json({
      output: stdout || "Program executed successfully.",
    });
  });
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
