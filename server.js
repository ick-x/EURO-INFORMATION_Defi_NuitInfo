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
  const reponse = response.data.choices[0].text;
  res.send(reponse);
  
  const [src, setSrc] = useState("");
  const generateImage = async () => {
    const res = await openai.createImage({
      prompt: "a red apple",
      n: 1,
      size: "512x512",
    });

    console.log("ICI : " + res.data.data[0].url);
    setSrc(res.data.data[0].url);
  };
});

app.listen(port, () => {
  console.log(`Application exemple à l'écoute sur le port ${port} !`);
});
