# FunctionLab — AI Math Differentiator

A responsive web app for learning **functions** through three differentiated levels: Foundation, Standard, and Advanced. It includes level-specific tasks, answer checking, hints, worked solutions, a Generate New Problem button that requests a fresh AI-generated task each time (with randomized local fallback), and an AI tutor endpoint.

## How it meets the assignment
- **Interactive interface:** responsive HTML/CSS/JavaScript with selectable levels and answer checking.
- **AI integration:** Vercel serverless endpoints call the OpenAI Responses API. The key is stored as a server-side environment variable, not in frontend code.
- **Three levels:** Foundation uses step-by-step scaffolding; Standard uses curriculum-level function evaluation and equations; Advanced uses real-world function modelling and inequalities.
- **Feedback:** learners can request hints, explanations, or ask a question. Built-in support remains available if AI is not configured.
- **Safety/accuracy:** the AI is instructed to verify calculations, and the app warns that generated guidance should be checked.

## Run locally
Prerequisites: Node.js and a Vercel account/CLI.

1. Install the Vercel CLI: `npm install -g vercel`
2. In this folder run: `vercel dev`
3. To enable live AI, create `.env.local` and add:
   `OPENAI_API_KEY=your_real_key`
   Optionally set `OPENAI_MODEL=gpt-4.1-mini`.
4. Never commit `.env.local` or publish your API key. The app still works with built-in hints and solutions without a key.

## Deploy
1. Create a GitHub repository and upload all files in this folder.
2. Import the repository into Vercel at https://vercel.com/new.
3. In the Vercel project settings, open **Environment Variables** and add `OPENAI_API_KEY` with your own API key. Optionally add `OPENAI_MODEL` = `gpt-4.1-mini`.
4. Redeploy after adding the environment variable.
5. Open the deployed URL and test all three levels, hints, solutions, and the question box.

**Important:** GitHub Pages alone will not run the `/api` serverless functions. Use Vercel (or adapt the backend to another serverless platform).

## Project files
- `index.html` — app layout
- `style.css` — responsive visual design
- `script.js` — level switching, answer checking, tutor requests
- `api/tutor.js` — server-side OpenAI integration and level-specific prompt
- `api/health.js` — checks whether an API key is configured
- `REPORT.md` — one-page assignment report
- `.env.example` — safe environment variable template

## Test checklist
- [ ] Switch between all 3 levels; the task and level label should change.
- [ ] Check a correct and an incorrect answer.
- [ ] Request a hint and a worked solution; click Generate New Problem several times and confirm the task changes.
- [ ] Ask the AI a question after setting `OPENAI_API_KEY`.
- [ ] Test on a narrow/mobile screen.
- [ ] Confirm the API key is not present in browser source or GitHub.
