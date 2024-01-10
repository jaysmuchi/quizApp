"use strict";
const questION = document.getElementById('question');
const a_text = document.getElementById('a_a');
const b_text = document.getElementById('b_b');
const c_text = document.getElementById('c_c');
const d_text = document.getElementById('d_d');
const submit = document.getElementById('submit'),
      answerEl = document.querySelectorAll('input[name="answer"]'),
      laBEL = document.querySelectorAll('label'),
      loader = document.getElementById('loader_section'),
      countDown = document.getElementById('display'),
      userName = document.getElementById('user_name'),
      btnSubmit = document.getElementById('btn-submit'),
      userContainer = document.getElementById('user_inner_container'),
      close = document.querySelector('span#btn-close-span'),
      preVious = document.querySelector('h4.user_section_header'),
      container = document.getElementById('quiz-container');

let currentQuiz = 0;
let score = 0;
// let data;

async function quiz() {

    try {
        const response = await fetch("./data.json");
        const data = await response.json();



                const msg = data[currentQuiz];
                questION.innerText = msg.question;
                a_text.innerText = msg.a;
                b_text.innerText = msg.b;
                c_text.innerText = msg.c;
                d_text.innerText = msg.d;
               
    
               submit.addEventListener('click', e => {
                e.preventDefault();
                const answer =  getAnswer();
                // console.log(answer);

                if (currentQuiz === data.length) {
                    console.log('finised');
                    let user = localStorage.getItem('Names');
                    container.innerHTML = `<p id="name">${user}</p> <h2 id="reload">You answered ${score}/${data.length} questions correctly</h2>
                    <button onClick= "location.reload()" id="reload-btn"> Reload </button>
                    `
                    return self;
                }else if(answer === data[currentQuiz].correct){
                    console.log(score++);
                }

                currentQuiz++;    

                if (data[currentQuiz]) {
                    questION.innerText = data[currentQuiz].question;
                    a_text.innerText = data[currentQuiz].a;
                    b_text.innerText = data[currentQuiz].b;
                    c_text.innerText = data[currentQuiz].c;
                    d_text.innerText = data[currentQuiz].d;
                }
            })
        return data;
    } catch (error) {
        console.log(error);
    }
    
}



// // deselect answer
function deselectAnswer() {
    answerEl.forEach((answerEl) => {
        answerEl.checked = false;
    })
    return answerEl;
}


// get selected answer
function getAnswer(){
    let answer;
    // check if answer is selected!
    for (const answers of answerEl) {
        if (answers.checked) {
            answer = answers.id;
        //    console.log(answer);
        }
    }
    return answer;
}
// button for submit event

function doSomething() {

    submit.addEventListener('click', e => {
        e.preventDefault();
        // currentQuiz++;    
        deselectAnswer();
        submit.innerText = 'submit';
    
    })
    
}
quiz().then(doSomething);


// getPRevious Question
// preVious.addEventListener('click', e => {
//     e.preventDefault();
//     // alert('previous loaded')
//     currentQuiz--;
// })

// quiz timer countdown

function disableLoder() {
      // diable loader proper after 7 section
      setTimeout(() => {
        loader.style.visibility = 'hidden';
    }, 10000);
    return;
    
}

disableLoder();

// timer to finish quiz
function quizTimer() {
    let vanish = new Date();

    if (vanish.getSeconds() != true) {

      
        let count = 100;
        setInterval(() => {
            if (count <= -1 ) {
                clearInterval(count);
                // location.reload();
                let data = 20;
                let user = localStorage.getItem('Names');
                    container.innerHTML = `<p id="name">${user}</p> <h2 id="reload">You answered ${score}/${data} questions correctly</h2>
                    <button onClick= "location.reload()" id="reload-btn"> Reload </button>
                   `
                // console.log(loader);
                return;
            }
            countDown.innerHTML = count--;
        }, 1500);
    }
}

function nameProcessor() {
    btnSubmit.addEventListener('click', e => {
        e.preventDefault();
        if (userName.value === "") {
            alert('Hey! input your username to start quiz!');
            return;
        } else {
            localStorage.setItem('Names', userName.value);
            console.log(userName.value);
            userContainer.style.visibility = 'hidden';
            quizTimer();
        }
    })
    close.addEventListener('click', e => {
        e.preventDefault();
        if (userName.value === "") {
            alert('please input your username to start quiz!');
            return;
        }else{
            userContainer.style.visibility = 'hidden';
        }
    })
}
nameProcessor();