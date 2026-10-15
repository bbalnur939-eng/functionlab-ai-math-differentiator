const levels = {
 foundation:{label:"FOUNDATION",title:"Understand the function rule",problem:"A function is a rule that gives exactly one output for each input. For f(x) = 2x + 3, find f(4).",answer:"11",hint:"Replace x with 4. Start by calculating 2 × 4, then add 3.",solution:"1. The rule is f(x) = 2x + 3.\n2. Substitute 4 for x: f(4) = 2 × 4 + 3.\n3. Multiply: 2 × 4 = 8.\n4. Add: 8 + 3 = 11.\nSo f(4) = 11.",explain:"A function rule tells you what to do with the input. Here, double the input and add 3. With input 4, the output is 11.",newProblem:{title:"Try another input",problem:"For f(x) = 3x − 2, find f(5).",answer:"13",hint:"Substitute 5 for x: multiply 3 by 5, then subtract 2.",solution:"f(5) = 3(5) − 2 = 15 − 2 = 13."}},
 standard:{label:"STANDARD",title:"Evaluate and compare functions",problem:"Given f(x) = 3x − 4, calculate f(6). Then find the input x for which f(x) = 11.",answer:"14; 5",hint:"First calculate f(6) by substituting 6. For the second part, solve 3x − 4 = 11.",solution:"Part A: f(6) = 3(6) − 4 = 18 − 4 = 14.\nPart B: 3x − 4 = 11. Add 4 to both sides: 3x = 15. Divide by 3: x = 5.\nAnswers: f(6) = 14 and x = 5.",explain:"Evaluating a function means finding the output for a known input. Solving f(x) = 11 reverses the process: you know the output and find the input.",newProblem:{title:"Compare two rules",problem:"Let f(x) = 2x + 1 and g(x) = x + 7. Find f(3) and g(3). Which output is greater?",answer:"f(3)=7; g(3)=10; g",hint:"Substitute 3 into each rule separately, then compare the two outputs.",solution:"f(3) = 2(3) + 1 = 7. g(3) = 3 + 7 = 10. Since 10 > 7, g(3) is greater."}},
 advanced:{label:"ADVANCED",title:"Model a real-world situation",problem:"A bike rental costs a fixed 6-unit fee plus 4 units per hour. The total cost is C(h) = 4h + 6. (a) Find the cost for 5 hours. (b) If a customer pays 34 units, how many hours did they rent the bike?",answer:"26; 7",hint:"(a) Substitute h = 5. (b) Set 4h + 6 = 34 and solve for h.",solution:"(a) C(5) = 4(5) + 6 = 20 + 6 = 26 units.\n(b) 4h + 6 = 34. Subtract 6: 4h = 28. Divide by 4: h = 7 hours.\nThe rental costs 26 units for 5 hours, and a 34-unit payment corresponds to 7 hours.",explain:"The fixed fee is the constant 6, and the hourly rate is the coefficient 4. The function models total cost from hours rented.",newProblem:{title:"Plan a phone package",problem:"A phone plan costs 8 units monthly plus 2 units per gigabyte of extra data: P(g) = 2g + 8. (a) Find the cost for 9 GB extra. (b) With a 30-unit budget, what is the maximum whole number of extra GB?",answer:"26; 11",hint:"(a) Evaluate P(9). (b) Solve 2g + 8 ≤ 30, then choose the largest whole-number g.",solution:"(a) P(9) = 2(9) + 8 = 26 units.\n(b) 2g + 8 ≤ 30 gives 2g ≤ 22, so g ≤ 11. The maximum is 11 GB."}}
};
let currentLevel="foundation", currentProblem=null;
const $=id=>document.getElementById(id);
function loadLevel(level, useNew=false){currentLevel=level;const data=levels[level];currentProblem=useNew?data.newProblem:{title:data.title,problem:data.problem,answer:data.answer,hint:data.hint,solution:data.solution,explain:data.explain};document.querySelectorAll(".level-card").forEach(b=>b.classList.toggle("active",b.dataset.level===level));$("levelBadge").textContent=data.label;$("problemTitle").textContent=currentProblem.title;$("problemText").textContent=currentProblem.problem;$("answerInput").value="";$("feedback").textContent="";$("feedback").className="feedback";$("supportBox").classList.add("hidden");}
function normalize(s){return String(s||"").toLowerCase().replace(/\s/g,"").replace(/units?/g,"").replace(/,/g,";").replace(/:/g,"=").replace(/;/g,";")}
function checkAnswer(){const got=normalize($("answerInput").value);if(!got){$("feedback").textContent="Enter an answer first, then check it.";return}const accepted=currentProblem.answer.split(";").map(normalize);const right=accepted.length===1?got===accepted[0]:accepted.every(a=>got.includes(a));$("feedback").className="feedback "+(right?"good":"try");$("feedback").textContent=right?"Correct — nice work! Review the solution to see why it works.":"Not quite yet. Try a hint, check each step, and give it another go."}
function showSupport(title,content){$("supportTitle").textContent=title;$("supportContent").textContent=content;$("supportBox").classList.remove("hidden")}
function showHint(){showSupport("A hint for your level",currentProblem.hint)}
function showSolution(){showSupport("Worked solution",currentProblem.solution)}
async function askAI(kind,question){const status=$("aiStatus");status.textContent="AI service: preparing response…";const payload={level:currentLevel,topic:"functions",problem:currentProblem.problem,question:question||"",kind,expectedAnswer:currentProblem.answer};try{const response=await fetch("/api/tutor",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});const data=await response.json();if(!response.ok)throw new Error(data.error||"AI service is unavailable.");showSupport(kind==="hint"?"AI-generated hint":kind==="solution"?"AI-generated explanation":"AI tutor response",data.text);status.textContent="AI service: connected";}catch(err){const fallback=kind==="hint"?currentProblem.hint:kind==="solution"?currentProblem.solution:`I couldn't reach the AI service just now. You can still use the built-in hint and worked solution. Your question was: ${question}`;showSupport("Built-in learning support",fallback+"\n\nNote: live AI requires deployment with an OpenAI API key.");status.textContent="AI service: offline — built-in support is available";}}
document.querySelectorAll(".level-card").forEach(b=>b.addEventListener("click",()=>loadLevel(b.dataset.level)));
$("checkBtn").addEventListener("click",checkAnswer);$("answerInput").addEventListener("keydown",e=>{if(e.key==="Enter")checkAnswer()});
$("hintBtn").addEventListener("click",()=>askAI("hint",""));$("solutionBtn").addEventListener("click",()=>askAI("solution",""));
function localGeneratedProblem(level){
  // Fresh parameterized tasks provide an immediate fallback if the AI API is unavailable.
  const rand=(min,max)=>Math.floor(Math.random()*(max-min+1))+min;
  if(level==="foundation"){
    const a=rand(2,6), b=rand(1,12), x=rand(2,9), op=Math.random()<.5?"+":"−";
    const answer=op==="+"?a*x+b:a*x-b;
    return {title:"A fresh function challenge",problem:`For f(x) = ${a}x ${op} ${b}, find f(${x}).`,answer:String(answer),hint:`Replace x with ${x}. Calculate ${a} × ${x} first, then ${op==="+"?"add":"subtract"} ${b}.`,solution:`Substitute ${x} for x: f(${x}) = ${a}(${x}) ${op} ${b}.\nMultiply: ${a} × ${x} = ${a*x}.\nThen ${op==="+"?"add":"subtract"} ${b}: the answer is ${answer}.`};
  }
  if(level==="standard"){
    const a=rand(2,7), x=rand(2,9), b=rand(1,10), y=a*x+b;
    return {title:"Evaluate and solve",problem:`Given f(x) = ${a}x + ${b}, (a) find f(${x}); (b) find x if f(x) = ${y}.`,answer:`${y}; ${x}`,hint:`(a) Substitute ${x} for x. (b) Solve ${a}x + ${b} = ${y} by subtracting ${b}, then dividing by ${a}.`,solution:`(a) f(${x}) = ${a}(${x}) + ${b} = ${a*x+b}.\n(b) ${a}x + ${b} = ${y}. Subtract ${b}: ${a}x = ${a*x}. Divide by ${a}: x = ${x}.`};
  }
  const rate=rand(2,8), fixed=rand(3,15), hours=rand(2,8), total=rate*hours+fixed, targetHours=rand(3,9), target=rate*targetHours+fixed;
  return {title:"A new real-world function model",problem:`A service charges a fixed fee of ${fixed} units plus ${rate} units per hour. Its cost function is C(h) = ${rate}h + ${fixed}. (a) Find the cost for ${hours} hours. (b) How many hours does a bill of ${target} units represent?`,answer:`${total}; ${targetHours}`,hint:`(a) Substitute h = ${hours}. (b) Solve ${rate}h + ${fixed} = ${target}: subtract the fixed fee, then divide by the hourly rate.`,solution:`(a) C(${hours}) = ${rate}(${hours}) + ${fixed} = ${total} units.\n(b) ${rate}h + ${fixed} = ${target}. Subtract ${fixed}: ${rate}h = ${target-fixed}. Divide by ${rate}: h = ${targetHours} hours.`};
}
async function generateNewProblem(){
  $("newBtn").disabled=true; $("newBtn").textContent="Generating…";
  $("feedback").textContent="Creating a fresh problem for your level…"; $("feedback").className="feedback";
  try {
    const response=await fetch("/api/tutor",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({level:currentLevel,topic:"functions",problem:currentProblem.problem,kind:"generate",expectedAnswer:"",question:"Generate a brand-new problem; do not repeat the current task."})});
    const data=await response.json();
    if(!response.ok || !data.problem || !data.answer || !data.solution) throw new Error(data.error||"AI generation unavailable");
    currentProblem={title:data.title||"A fresh function challenge",problem:data.problem,answer:String(data.answer),hint:data.hint||"Identify the input and substitute it into the function rule.",solution:data.solution,explain:data.explain||""};
    $("aiStatus").textContent="AI service: generated a new problem";
  } catch(err) {
    currentProblem=localGeneratedProblem(currentLevel);
    $("aiStatus").textContent="AI service: local problem generator active — configure API for AI-generated tasks";
  }
  $("problemTitle").textContent=currentProblem.title;$("problemText").textContent=currentProblem.problem;
  $("answerInput").value="";$("feedback").textContent="";$("feedback").className="feedback";$("supportBox").classList.add("hidden");
  $("newBtn").disabled=false;$("newBtn").textContent="Generate new problem ↻";
}
$("newBtn").addEventListener("click",generateNewProblem);
$("askBtn").addEventListener("click",()=>{const q=$("questionInput").value.trim();if(!q){$("questionInput").focus();return}askAI("question",q)});
fetch("/api/health").then(r=>r.json()).then(d=>$("aiStatus").textContent=d.configured?"AI service: connected":"AI service: setup needed — built-in support is available").catch(()=>$("aiStatus").textContent="AI service: offline — built-in support is available");
loadLevel("foundation");
