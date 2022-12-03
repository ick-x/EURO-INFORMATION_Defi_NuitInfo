async function getPrompt(prompt) {
    const req = await fetch(`/complete?prompt=${encodeURI(prompt)}`);
    const result = await req.text();
    document.getElementById("result").innerText = result;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const formulaire = document.getElementById("formulaire");

    formulaire.addEventListener("submit", (e) => {
      e.preventDefault();
      const prompt = document.querySelector(
        `#formulaire input[name="prompt"]`
      );
      getPrompt(prompt.value);
    });
  });