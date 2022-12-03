const token = "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";

import { Dalle } from "node-dalle2";

import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  apiKey: token,
});
const openai = new OpenAIApi(configuration);

import express from "express";
const app = express();
const port = 3000;
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("pages/index");
});

app.get("/complete", async (req, res) => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: req.query.prompt,
    max_tokens: 700,
    temperature: 0,
  });
  console.log(response);
  const reponse = response.data.choices[0].text;
  res.send(reponse);
});

app.get("/image", async (req, res) => {
  console.log(req);
  const response = await openai.createImage({
    prompt: req.query.prompt,
    n: 1,
    size: "512x512",
  });

  const src = response.data.data[0].url;
  res.send(src);
});

app.listen(port, () => {
  console.log(`Application exemple à l'écoute sur le port ${port} !`);
});
