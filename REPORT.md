# Brief Report: FunctionLab — Web-Based AI Math Differentiator

**Topic:** Functions  
**Intended learners:** lower-secondary mathematics students (approximately Grades 7–9; adjust to the course curriculum)

## Purpose and design
FunctionLab demonstrates differentiated learning by presenting the same core concept—substituting an input into a function rule—at three levels. Foundation uses the rule \(f(x)=2x+3\), explicit arithmetic steps, and a direct scaffolded hint. Standard combines function evaluation with solving an equation such as \(3x-4=11\). Advanced uses a real-world cost model, \(C(h)=4h+6\), and asks learners to interpret the result and solve for an unknown input. Each level includes answer checking and a worked solution; a second task supports further practice.

## AI prompt design
The server-side prompt assigns the model the role of a careful mathematics tutor and passes the selected level, task, learner question, and expected answer for internal verification. Level-specific instructions are used:
- **Foundation:** simple language, one small step at a time, explain vocabulary, and scaffold the process.
- **Standard:** curriculum-level language, independent reasoning, and a clear explanation of the key calculation.
- **Advanced:** multi-step reasoning, real-world interpretation, and explanation of assumptions or inequalities.

The request type changes the tutor's behavior. A hint request explicitly tells the model not to reveal the final answer; a solution request asks for a worked explanation; a question request asks the model to answer the learner's own question. The prompt also instructs the model to verify calculations and acknowledge ambiguity rather than invent details.

## Technical implementation and evaluation
The interface is built with HTML, CSS, and JavaScript. A Vercel serverless function calls the OpenAI Responses API, keeping the API key in a deployment environment variable instead of browser code. Built-in hints and solutions remain available if the API is not configured. Testing should include all levels, correct and incorrect answers, hint/solution requests, learner questions, mobile layout, and a review of mathematical accuracy. Since generative AI can make mistakes, outputs should be checked by the student or teacher before being relied on.

## Differentiation achieved
The same underlying function concept is adapted through **scaffolding**, **task complexity**, **independence**, and **context**: Foundation offers guided substitution, Standard expects equation solving, and Advanced applies functions to a contextual model. This allows learners to practise a shared learning objective with different amounts of support and challenge.
