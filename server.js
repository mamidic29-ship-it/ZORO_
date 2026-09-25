require("dotenv").config();

const express = require("express");
const OpenAI = require("openai");
const path = require("path");

const app = express();
const PORT = 3000;

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

app.use(express.static(
  path.join(__dirname, "public")
));


/* =========================
   HOME
========================= */

app.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "public", "index.html")
  );
});


/* =========================
   CHAT
========================= */

app.post("/api/chat", async (req, res) => {

  try {

    const message = String(
      req.body.message || ""
    ).trim();

    if (!message) {
      return res.status(400).json({
        error: "Message is required"
      });
    }

    const response = await client.responses.create({

      model: "gpt-5.6-luna",

      instructions:
        "You are ZORO, a helpful personal AI assistant. " +
        "Keep normal replies concise and natural.",

      input: message

    });

    res.json({
      reply: response.output_text
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "ZORO could not respond."
    });

  }

});


/* =========================
   VISION
========================= */

app.post("/api/vision", async (req, res) => {

  try {

    const image = req.body.image;

    if (!image) {
      return res.status(400).json({
        error: "Image is required"
      });
    }

    const response = await client.responses.create({

      model: "gpt-5.6-luna",

      instructions:
        "You are ZORO. Analyze the image carefully. " +
        "Describe what is relevant in a natural, concise way. " +
        "Do not claim to see something that is not visible.",

      input: [
        {
          role: "user",

          content: [
            {
              type: "input_text",
              text:
                "Analyze this image and tell me what you see."
            },
            {
              type: "input_image",
              image_url: image
            }
          ]
        }
      ]

    });

    res.json({
      reply: response.output_text
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Vision analysis failed."
    });

  }

});


/* =========================
   START
========================= */

app.listen(PORT, () => {

  console.log(
    `ZORO running at http://localhost:${PORT}`
  );

});
