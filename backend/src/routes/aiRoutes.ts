import dotenv from "dotenv";
import express from "express";
import OpenAI from "openai";

dotenv.config();

const router = express.Router();

const configuration = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
});

router.post("/suggest", async (req, res) => {
  const { code } = req.body;

  if (!code) {
    res.status(400).json({ message: "Code is required" });
    return;
  }

  try {
    // INFO: Commented actual openai api code because quota is over
    // So adding mock response for ai

    // const prompt = `Explain what the following code does: \n\n${code}`;

    // const response = await configuration.chat.completions.create({
    //   model: "gpt-3.5-turbo",
    //   messages: [
    //     {
    //       role: "system",
    //       content:
    //         "You are a helpful code assistant that explains code clearly.",
    //     },
    //     {
    //       role: "user",
    //       content: prompt,
    //     },
    //   ],
    //   max_tokens: 150,
    // });

    // res.json({ suggestion: response.choices[0].message.content });

    const mockResponse =
      `This code appears to ${
        code.includes("for")
          ? "loop through a collection"
          : "perform a basic operation"
      }.\n\n` +
      `It's a simple example of ${
        code.includes("function") ? "defining a function" : "executing logic"
      } in JavaScript.`;

    res.json({ suggestion: mockResponse });
  } catch (error: any) {
    res.status(500).json({ message: "Failed to get AI suggestion" });
  }
});

export default router;
