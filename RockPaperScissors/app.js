
// let userScore = 0;
// let compScore = 0;

// const choices = document.querySelectorAll(".choice");
// let msg = document.querySelector("#msg");

// const getCompChoice = () => {
//     let choices = ["rock", "paper", "scissors"];
//     let randIdx = Math.floor(Math.random()*3);
//     let compChoice = choices[randIdx];
//     return compChoice;
// };


// const gameDraw = () => {
//     msg.innerText = "Game was a draw! Play again."
//     msg.style.backgroundColor = "#081b31";
// };


// const showWinner = (userWin, userChoice, compChoice) => {
//     if(userWin) {
//         userScore++
//         msg.innerText = `Your ${userChoice} beats comp's ${compChoice}`;
//         msg.style.backgroundColor = "green";
//         document.querySelector("#user-score").innerText = userScore;
//     } else {
//         compScore++
//         msg.innerText = `comp's ${compChoice} beats Your ${userChoice}`;
//         msg.style.backgroundColor = "red";
//         document.querySelector("#comp-score").innerText = compScore;
//     }
// };


// const checkAns = (userChoice) => {
//     let compChoice = getCompChoice();
//     if(userChoice === compChoice) {
//         gameDraw()
//     } else {
//         let userWin = false;
//         if(userChoice === "rock") {
//             userWin = compChoice === "paper" ? false : true
//         } else if(userChoice === "paper") {
//             userWin = compChoice === "scissors" ? false : true;
//         } else {
//             userWin = compChoice === "rock" ? false : true;
//         }
//         showWinner(userWin, userChoice, compChoice);
//     }
// };


// for(let choice of choices) {
//     choice.addEventListener("click", () => {
//         let userChoice = choice.id;
//         console.log(userChoice);
//         checkAns(userChoice);
//     })
// };

// const resetGame = () => {
//     userScore = 0;
//     compScore = 0;
//     document.querySelector("#user-score").innerText = userScore;
//     document.querySelector("#comp-score").innerText = compScore;
//     msg.innerText = "Start the game";
//     msg.style.backgroundColor = "#081b31";
// }

// document.querySelector("#reset-btn").addEventListener("click", resetGame);




let choices = document.querySelectorAll(".choice");
let userScore = 0;
let compScore = 0;
const msg = document.querySelector("#msg");


const getCompChoice = () => {
    const compchoices = ["rock", "paper", "scissors"];
    let randIdx = Math.floor(Math.random()*3);
    let randChoice = compchoices[randIdx];
    return randChoice;
};


const drawGame = () => {
    msg.innerText = "Game was a draw! Play again";
    msg.style.backgroundColor = "#081b31";
};


const showWinner = (userWin, userChoice, compChoice) => {
    if(userWin) {
        userScore++;
        msg.innerText = `Your ${userChoice} beats comp's ${compChoice}`
        msg.style.backgroundColor = "green";
        document.querySelector("#user-score").innerText = userScore;
    } else {
        compScore++;
        msg.innerText = `Comp's ${compChoice} beats your ${userChoice}`
        msg.style.backgroundColor = "red";
        document.querySelector("#comp-score").innerText = compScore;
    }
};


const checkAns = (userChoice) => {
    let compChoice = getCompChoice();
    if(userChoice === compChoice) {
        drawGame()
    } else {
        let userWin = true;
        if(userChoice === "rock") {
            userWin = compChoice === "scissors" ? true : false;
        } else if(userChoice === "paper") {
            userWin = compChoice === "rock" ? true : false;
        } else {
            userWin = compChoice === "paper" ? true : false;
        }
        return showWinner(userWin, userChoice, compChoice);
    }
};


for(let choice of choices) {
    choice.addEventListener("click", () => {
        let userChoice = choice.id;
        checkAns(userChoice);
    })
};


const resetGame = () => {
    userWin = true;
    userScore = 0;
    compScore = 0;
    msg.innerText = "Play again."
    msg.style.backgroundColor = "#081b31";
    document.querySelector("#comp-score").innerText = 0;
    document.querySelector("#user-score").innerText = 0;
}

document.querySelector("#reset-btn").addEventListener("click", resetGame);

