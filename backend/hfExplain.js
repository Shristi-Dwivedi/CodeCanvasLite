async function explainError(errorText) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: `Explain this Python error in simple words for a beginner:\n${errorText}`,
      }),
    }
  );

  const data = await response.json();
  return data[0]?.generated_text || "Could not generate explanation.";
}

module.exports = explainError;
