function getDivFromObject(objects, qstNum, totalQsts){

    if (objects.length ===0){
        document.getElementById("final-score").innerHTML = "You have chosen 0 questions :/";
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
        choice.innerText = answers[i];
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


function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); 
        [arr[i], arr[j]] = [arr[j], arr[i]]; 
    }
}

objects = [
    {
      type: 'boolean',
      difficulty: 'easy',
      category: 'General Knowledge',
      question: 'One of Donald Trump&#039;s 2016 Presidential Campaign promises was to build a border wall between the United States and Mexico.',
      correct_answer: 'True',
      incorrect_answers: [ 'False' ]
    },
    {
      type: 'boolean',
      difficulty: 'medium',
      category: 'Animals',
      question: 'The Ceratosaurus, a dinosaur known for having a horn on the top of its nose, is also known to be a decendent of the Tyrannosaurus Rex.',
      correct_answer: 'False',
      incorrect_answers: [ 'True' ]
    },
    {
      type: 'boolean',
      difficulty: 'easy',
      category: 'Entertainment: Japanese Anime &amp; Manga',
      question: 'Clefairy was intended to be Ash&#039;s starting Pok&eacute;mon in the pilot episode of the cartoon.',
      correct_answer: 'True',
      incorrect_answers: [ 'False' ]
    },
    {
      type: 'boolean',
      difficulty: 'medium',
      category: 'Entertainment: Video Games',
      question: 'The game Garry&#039;s Mod originally took assets and codes from the popular Half Life 2 mod JBmod.',
      correct_answer: 'True',
      incorrect_answers: [ 'False' ]
    },
    {
      type: 'boolean',
      difficulty: 'medium',
      category: 'Entertainment: Comics',
      question: 'In the webcomic Homestuck, the first character introduced is Dave Strider.',
      correct_answer: 'False',
      incorrect_answers: [ 'True' ]
    }
  ]

document.forms[0].appendChild(getDivFromObject(
    objects, 
    0,
    objects.length
));
