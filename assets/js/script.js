//initial data

let totalQuestoes = questions.length;
let currentQuestion = 0;
let scoreArea = document.querySelector('.scoreArea');
let questionsArea = document.querySelector('.questionArea');
let askedQuestionArea = document.querySelector('.question');
let answersArea = document.querySelector('.options');
let displayQuestionText = document.querySelector('h2');
let hits = 0;
let misses = 0;
let endText = document.querySelector('.scoreText1');
let restartButton = document.querySelector('.scoreArea button');
let progressBar = document.querySelector('.progress--bar');

//Events

restartButton.addEventListener('click', restartQuiz);


//Functions

function showQuestion() {
    if(questions[currentQuestion]) {
        let q = questions[currentQuestion];

        scoreArea.style.display  = "none";
        questionsArea.style.display = "block";
        askedQuestionArea.innerHTML = q.question;
        answersArea.innerHTML = '';

        let optionsHtml = '';
        for(let i in q.options) {

            optionsHtml += `<div data-op=${i} class="option"><span>${parseInt(i)+1}</span>${q.options[i]}</div>`;

        }
        answersArea.innerHTML = optionsHtml;

        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent);
        })
    } else {
        finishQuiz();
    }
    progressBar.style.width = `${Math.floor((currentQuestion/totalQuestoes)*100)}%`
}

function optionClickEvent(e) {

    if(e.target.getAttribute('data-op') == questions[currentQuestion].answer) {
        hits++;
    } else {
        misses++;
    }
    currentQuestion++;
    showQuestion();
}

function finishQuiz() {

    if (Math.floor(hits/totalQuestoes*100) >= 70) {
        endText.innerHTML = 'Congratulations!'
        document.querySelector('.scorePct').style.color = "#0D630D";
    } else if(Math.floor(hits/totalQuestoes*100) >= 40) {
        endText.innerHTML = 'Nice try, but you got to keep studying!'
        document.querySelector('.scorePct').style.color = "#FFFF00";
    } else {
        endText.innerHTML = 'Your result was not good, but is never late to learn!'
        document.querySelector('.scorePct').style.color = "#FF0000";
    }
    displayQuestionText.style.display = "none";
    questionsArea.style.display = "none";
    scoreArea.style.display = "block";
    document.querySelector('.scorePct').innerHTML = `Your score is ${Math.floor(hits/totalQuestoes*100)}%`;
    document.querySelector('.scoreText2').innerHTML = `You answered ${totalQuestoes} questions and got ${hits} right.`;
    
}

function restartQuiz() {
    currentQuestion = 0;
    hits = 0;
    misses = 0;
    progressBar.style.width = 0;
    questionsArea.style.display = "none";
    scoreArea.style.display = "none";
    displayQuestionText.style.display = "block";
    showQuestion();
}

showQuestion()