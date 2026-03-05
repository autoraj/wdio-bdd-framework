const fs = require("fs");
const axios = require("axios");

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPOSITORY = process.env.GITHUB_REPOSITORY;
const PR_NUMBER = process.env.GITHUB_REF.match(/\/(\d+)$/)?.[1];

async function runReview() {
  const rules = fs.readFileSync("ai-review/automation-rules.md", "utf8");
  const diff = fs.readFileSync("pr_diff.txt", "utf8");

  const prompt = `
${rules}

Below is the Pull Request diff:

${diff}

Provide:
1. List of Issues
2. Severity (Low/Medium/High)
3. File name
4. Suggested Fix
Return response in JSON format.
`;

  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a Senior Automation Architect." },
        { role: "user", content: prompt }
      ],
      temperature: 0.2
    },
    {
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );

  const review = response.data.choices[0].message.content;

  await postComment(review);
}

async function postComment(comment) {
  const url = `https://api.github.com/repos/${GITHUB_REPOSITORY}/issues/${PR_NUMBER}/comments`;

  await axios.post(
    url,
    { body: `🤖 AI Automation Review:\n\n${comment}` },
    {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json"
      }
    }
  );
}

runReview();
