var startBtn = document.querySelector(".startBtn");
var quizBox = document.querySelector("#quizBox");
var quizQuestionHtml = document.querySelector("#quizQuestion");
var quizAnswersHtml = document.querySelector("#quizAnswers"); 
var buttonOneHtml = document.querySelector("#oneHtml");
var buttonTwoHtml = document.querySelector("#twoHtml");
var buttonThreeHtml = document.querySelector("#threeHtml");
var buttonFourHtml = document.querySelector("#fourHtml");
var timerCountHtml = document.querySelector("#timerCount");
var score = document.querySelector("#finalScore");
var input = document.querySelector("#nameInput");
var scoreButtonHtml = document.querySelector("#scoreButton");
var scoreboard = document.querySelector("#scoreboard");


var questionOne = {
    question: 'Sharks are older than...',
    answer1: 'your mom',
    answer2: 'the pizza in my fridge',
    answer3: 'trees',
    answer4: 'all of the above', //correct answer
};
var questionTwo = {
    question: 'This kills more people than sharks yearly...',
    answer1: 'Vending Machines',
    answer2: 'Electric Scooters',
    answer3: 'Toilets',
    answer4: 'All of the above', //correct answer
};

var questionThree = {
    question: 'Surfers nickname for sharks is...',
    answer1: 'Nope boats',
    answer2: 'Smooth boys',
    answer3: 'The guys in gray', //correct answer
    answer4: 'Bite-y kooks',
};

var questionFour = {
    question: 'This shark is known as the Bloodhound of the sea...',
    answer1: 'Greenland shark',
    answer2: 'Tiger shark',
    answer3: 'Oceanic Whitetip', //correct answer
    answer4: 'Dogfish shark',
};

var finalScore = 100;
var timeLeft = 60;
var i = 0;








var questionArray = [questionOne, questionTwo, questionThree, questionFour];
// array of correct answers
var answerArray = [questionArray[0].answer4, questionArray[1].answer4, questionArray[2].answer3, questionArray[3].answer3];
var scoreArray = [];


function getLocal(scoreArray) {
    if (localStorage.getItem("final score") === null) {
        
        return scoreArray;
    } else {
        
        return JSON.parse(localStorage.getItem("final score"));
    }
}
function sortScore(scoreArray) {
    scoreArray = scoreArray.sort(function(a, b) { return a.score - b.score });
    scoreArray = scoreArray.reverse();
    //console.log('lsorting function keepingScoreArray' + keepingScoreArray)
    return scoreArray;
}

startBtn.addEventListener("click", function(event) {
    countdown();
    
    quizQuestionHtml.innerHTML = questionArray[i].question;
    buttonOneHtml.innerHTML = questionArray[i].answer1;
    buttonTwoHtml.innerHTML = questionArray[i].answer2;
    buttonThreeHtml.innerHTML = questionArray[i].answer3;
    buttonFourHtml.innerHTML = questionArray[i].answer4;
});

quizAnswersHtml.addEventListener("click", function(event) {
    var targetHtmlElement = event.target;
    event.stopPropagation();
    if (((targetHtmlElement.matches("#fourHtml")) && (buttonFourHtml.innerHTML == answerArray[0])) ||
        ((targetHtmlElement.matches("#twoHtml")) && (buttonTwoHtml.innerHTML == answerArray[1])) ||
        ((targetHtmlElement.matches("#oneHtml")) && (buttonOneHtml.innerHTML == answerArray[2])) ||
        ((targetHtmlElement.matches("#threeHtml")) && (buttonThreeHtml.innerHTML == answerArray[3]))) {
        var correctAnswerMsg = document.createElement("div");
        correctAnswerMsg.innerHTML = "Yay " + (i + 1) + " Correct!";
        document.getElementById('quizBox').appendChild(correctAnswerMsg);
        setTimeout(function() {
            correctAnswerMsg.innerHTML = '';
        }, 1000);
    } else {
        //console.log('oops, that is not correct')
        var wrongAnswerMsg = document.createElement("div");
        wrongAnswerMsg.textContent = "Boo " + (i + 1) + "wrong answer!";
        document.getElementById('quizBox').appendChild(wrongAnswerMsg);
        // user gets it wrong and loses 15 points
        timeLeft = (timeLeft - 10)
        finalScore = (finalScore - 10);
        setTimeout(function() {
            wrongAnswerMsg.innerHTML = '';
        }, 1000);
        // take 10 points away from user and keep track of that in our finalScore variable
    }
    i++;

    // quizQuestionHtml.innerHTML = questionArray[i].question;
    // buttonOneHtml.innerHTML = questionArray[i].answer1;
    // buttonTwoHtml.innerHTML = questionArray[i].answer2;
    // buttonThreeHtml.innerHTML = questionArray[i].answer3;
    // buttonFourHtml.innerHTML = questionArray[i].answer4;

    if (answerArray.length == i) {
        clearInterval(timeInterval);
        finalScore = (finalScore - (60 - timeLeft));
        console.log(finalScore);
        score.innerHTML = "Well done, your score is " + finalScore + "%";
        scoreButtonHtml.addEventListener("click", function() {
            keepingScoreArray = getLocal(keepingScoreArray);
            var scoreBoard = {
                name: inputHtml.value,
                score: finalScore
            }
            keepingScoreArray.push(scoreBoard);
            keepingScoreArray = sortScore(keepingScoreArray);
            for (var i = 0; i < keepingScoreArray.length; i++) {
                var j = keepingScoreArray[i];
                var newScoreLi = document.createElement("li");
                newScoreLi.textContent = "name: " + j.name + "  |  score: " + j.score;
                scoreboardHtml.appendChild(newScoreLi);
            }
            localStorage.setItem("final score", JSON.stringify(keepingScoreArray));
        });
    }
    quizQuestionHtml.innerHTML = questionArray[i].question;
    buttonOneHtml.innerHTML = questionArray[i].answer1;
    buttonTwoHtml.innerHTML = questionArray[i].answer2;
    buttonThreeHtml.innerHTML = questionArray[i].answer3;
    buttonFourHtml.innerHTML = questionArray[i].answer4;
});
var timeInterval = '';
function countdown() {
    timeInterval = setInterval(function() {
        if (timeLeft > 1) {
            timerCountHtml.innerHTML = timeLeft + ' seconds remaining';
            timeLeft--;
        } else if (timeLeft === 1) {
            timerCountHtml.innerHTML = timeLeft + ' Almost out of time!!!';
            timeLeft--;
        } else {
            timerCountHtml.innerHTML = '0';
            clearInterval(timeInterval);
        }
    }, 1000);
}