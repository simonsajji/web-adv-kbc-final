const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = document.getElementById("restart");
const quiz_box = document.querySelector(".container");
const result_box = document.querySelector(".result_box");
let option_list;
let time_line;
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
let next_btn;



let questions = [
    {
    numb: 1,
    question: "What does HTML stand for?",
    answer: "Hyper Text Markup Language",
    options: [
      "Hyper Text Preprocessor",
      "Hyper Text Markup Language",
      "Hyper Text Multiple Language",
      "Hyper Tool Multi Language"
    ]
  },
    {
    numb: 2,
    question: "Which toys have been marketed with the phrase “robots in disguise?",
    answer: "Transformers",
    options:["Bratz Dolls","Sylvanian Families","Transformers","Hatchimals"]
  },
    {
    numb: 3,
    question: "What is the Celsius equivalent of 77 degrees Fahrenheit?",
    answer: "25",
    options:[15,20,25,30]
  },
    {
    numb: 4,
    question: "What does SQL stand for?",
    answer: "Structured Query Language",
    options: [
      "Stylish Question Language",
      "Stylesheet Query Language",
      "Statement Question Language",
      "Structured Query Language"
    ]
  },
    {
    numb: 5,
    question: "What does XML stand for?",
    answer: "eXtensible Markup Language",
    options: [
      "eXtensible Markup Language",
      "eXecutable Multiple Language",
      "eXTra Multi-Program Language",
      "eXamine Multiple Language"
    ]
  },
  
];

const opt_list=document.getElementsByClassName("opts");

start_btn.onclick = ()=>{
    console.log("button clicked")
    info_box.classList.remove("none"); //show info box
    info_box.classList.add("activeInfo"); //show info box
    start_btn.classList.add("none");
}

exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
    info_box.classList.add("none");
    start_btn.classList.remove("none");
    window.location.reload();

}




let timeValue =  15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

function displayQuestions(index){
    const question_text=document.getElementById("question");

    question_text.textContent=questions[index].question;

    option_list=document.getElementsByClassName("opts");

    for(j=0;j<4;j++){

        option_list[j].innerText=questions[index].options[j]

    }


}

function startTimer(time){
    counter = setInterval(timer, 1000);

    function timer(){
        timeCount.textContent = time; 
        time--; 

        option_list=document.getElementsByClassName("opts");

         const allOptions = option_list.length; //getting all option items

        if(time < 0){ //if timer is less than 0
            clearInterval(counter); //clear counter
            timeText.textContent = "Time Off"; //change the time text to time off
            
            let correctAns = questions[que_count].answer; //getting correct answer from array
            console.log(correctAns);
            for(i=0; i < allOptions; i++){
                if(option_list[i].textContent == correctAns){ //if there is an option which is matched to an array answer
                    option_list[i].classList.add("correct"); //adding green color to matched option
                    console.log("Time Off: Auto selected correct answer.");
                }
            }

        }

            for(i=0; i < allOptions; i++){
                option_list[i].classList.add("disabled"); //once user select an option then disabled all options
            }
            // next_btn.classList.remove("none"); //show the next button if user selected any option

    }

    
}


function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time_line = document.querySelector(".time_line");
        time += 1; //upgrading time value with 1
        time_line.style.width = time + "px"; //increasing width of time_line with px by time value
        if(time > 549){ //if time value is greater than 549
            clearInterval(counterLine); //clear counterLine
        }
    }
}


function showResult(){
    let res=document.getElementById("res");
    let res1=document.getElementById("res1");
    let result=document.getElementById("result");

    quiz_box.classList.add("none");

    res.classList.remove("none");



    console.log(userScore *1000);
    res1.textContent=`You have WON $`;
    result.textContent=userScore*1000;


}

function optionSelected(answer){

    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    let userAns = answer.textContent; //getting user selected option
    let correctAns = questions[que_count].answer; //getting correct answer from array
    option_list=document.getElementsByClassName("opts");

    const allOptions = option_list.length; //getting all option items
    
    if(userAns == correctAns){ //if user selected option is equal to array's correct answer
        userScore += 1; //upgrading score value with 1
        answer.classList.add("correct"); //adding green color to correct selected option
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); //adding red color to correct selected option
        console.log("Wrong Answer");
        next_btn.classList.remove("none");

        for(i=0; i < allOptions; i++){
            if(option_list[i].textContent == correctAns){ //if there is an option which is matched to an array answer
                option_list[i].classList.add("correct"); //adding green color to matched option
                console.log("Time Off: Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    next_btn.classList.remove("none"); //show the next button if user selected any option

}


continue_btn.addEventListener("click",function(){
    console.log("button clicked")
    info_box.classList.add("none");
    quiz_box.classList.remove("none");
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz"); //show quiz box



    displayQuestions(0); //calling showQestions function

    startTimer(15); //calling startTimer function
    startTimerLine(0); //calling startTimerLine function

    next_btn=document.getElementById("next_btn");
    next_btn.addEventListener("click",function(){

        option_list=document.getElementsByClassName("opts");

        const allOptions = option_list.length; //getting all option items

        for(i=0; i < allOptions; i++){

            option_list[i].classList.remove("correct");
            option_list[i].classList.remove("incorrect");

        }


        if(que_count < questions.length - 1){ 
            que_count++; 
            que_numb++; 
            displayQuestions(que_count); 
            clearInterval(counter); 
            clearInterval(counterLine); 
            startTimer(timeValue); 
            startTimerLine(widthValue); //calling startTimerLine function
            timeText.textContent = "Time Left"; //change the timeText to Time Left
            next_btn.classList.add("none"); //hide the next button
        }
        else{
            clearInterval(counter); //clear counter
            clearInterval(counterLine); //clear counterLine
            showResult(); //calling showResult function
        }
    });
    

   


});
