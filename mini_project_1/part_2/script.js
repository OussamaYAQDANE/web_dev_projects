function getDivFromObject(objects, qstNum, totalQsts){

    if (objects.length ===0){
        document.getElementById("final-score").innerHTML = "An Error Occurred :/";
        return document.createElement("div");
    }

    const correct_answer = objects[qstNum].correct_answer;
    const answers = [correct_answer, ...objects[qstNum].incorrect_answers];

    if (objects[qstNum].type == 'boolean'){
        if (answers[0] == 'False'){
            answers.reverse();
        }
    } else {
        shuffleArray(answers);
    }

    const questionBox = document.createElement("div");
    questionBox.classList.add("question-box");


    // Setting up the timer + timeout and interval for control and periodic updates
    const timer = document.createElement("p");
    timer.classList.add("timer");
    timer.textContent = "0:15";
    let time = 15;
    const interval = setInterval(() => {
        time -= 1;
        timer.textContent = "0:" + (time<10 ? "0":"") + time.toString();
        if (time === 0) {
            clearInterval(interval);
            questionBox.classList.add("disabled");
            if (qstNum < totalQsts-1){
                questionBox.parentElement.appendChild(getDivFromObject(objects, qstNum+1,totalQsts));
                window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
            } else showFinalScore();
        }
    }, 1000);
    
    

    // Adding the question from the object
    const question = document.createElement("p");
    question.classList.add("question");
    question.innerHTML = objects[qstNum].question;


    // appending the timer and question to the big div cuz we're going to add the multiple choices
    questionBox.appendChild(timer);
    questionBox.appendChild(question);


    // Adding each choice
    for (let i in answers)
    {
        let choices = document.createElement("div");
        choices.classList.add("choice");
        let choice = document.createElement("label");
        let input = document.createElement("input");
        input.setAttribute("type", "radio");
        input.setAttribute("name", `${qstNum}`);
        input.setAttribute("value", answers[i]);
        input.setAttribute("id", `${qstNum+i}`);
        choice.setAttribute("for", `${qstNum+i}`);
        choice.innerHTML = answers[i];
        choices.appendChild(input);
        choices.appendChild(choice);
        questionBox.appendChild(choices);
    }

    
    // Adding the button that allows us to go to the next element
    const button = document.createElement("button");
    button.innerHTML = "Next";
    button.addEventListener("click", (e) => {
        e.preventDefault();
        clearInterval(interval);
        questionBox.classList.add("disabled");
        if (qstNum < totalQsts-1){
            questionBox.parentElement.appendChild(getDivFromObject(objects, qstNum+1,totalQsts));
            window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
        } else {
            showFinalScore()
        }
    })
    questionBox.appendChild(button);

    return questionBox;
}

function showFinalScore(){
    let score = 0;
    for (i in objects){
        let query = "input[name=";
        query += i.toString();
        query += "]:checked";
        let label = document.forms[0].querySelector(`input[name="${i}"]:checked`);
        if (label && label.value === objects[i].correct_answer){
            score += 1;
            console.log(score);
        }
    }
    document.getElementById("final-score").innerHTML = "Your Final Score is: "+ score.toString() + "/" + objects.length.toString()+"!";
    window.scrollTo({ top: 0, behavior: "smooth" });
}

async function getTriviaQuestions(isError = false) {
    try {
        if (!isError) {
            document.getElementById("final-score").innerHTML = "Loading...";
        }

        
        const params = new URLSearchParams(window.location.search);
        console.log(params);

        let link = "https://opentdb.com/api.php?amount=" + params.get("amount");

        if (params.get("trivia_category") !== "any"){
            link += "&category=" + params.get("trivia_category");
              
        }

        if (params.get("trivia_difficulty") !== "any"){
            link += "&difficulty=" + params.get("trivia_difficulty");
        }

        if (params.get("trivia_type") !== "any"){
            link += "&type=" + params.get("trivia_type");
        }
        
        if (params.get("trivia_encode") !== "default"){
            link += "&encode=" + params.get("trivia_encode")
        }

        let response = await fetch(link);
        const questions = await response.json();

        console.log(questions.results, "questionss");
        objects = questions.results;
        document.getElementById("final-score").innerHTML = "";
        document.forms[0].appendChild(getDivFromObject(
            objects, 
            0,
            objects.length
        ));
    } catch (error) {
        document.getElementById("final-score").innerHTML = "API connection Error.. Retrying";
        getTriviaQuestions(true);
        console.error("Error fetching trivia questions:", error);
    }
}

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); 
        [arr[i], arr[j]] = [arr[j], arr[i]]; 
    }
}

objects = []
getTriviaQuestions();

