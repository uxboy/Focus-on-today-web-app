const checkboxList = document.querySelectorAll(".custom-checkbox");
const inputList = document.querySelectorAll(".goal-container>input");
const errorLabel = document.querySelector(".error-label");
const progressBar = document.querySelector(".progress-bar");
const progressLabel = document.querySelector(".progress-label");
const progressValue = document.querySelector(".progress-value");
const allQuotes = [
    "Raise the bar by completing your goals",
    "Well begun is half done!",
    "Just a step away, keep going!",
    "Whoa! you just completed all the goals , time for chill :D"
]
let percentage = 0;


const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {
    first:{
        name : "",
        completed : false
    },
    second:{
        name : "",
        completed : false
    }, 
    third:{
        name : "",
        completed : false
    },
};
let completedGoalCount = Object.values(allGoals).filter((goal)=> goal.completed).length;
progressValue.style.width = `${(completedGoalCount/3) *100}%`
progressValue.firstElementChild.innerText = `${completedGoalCount}/3 completed`;
progressLabel.innerText = allQuotes[completedGoalCount];



checkboxList.forEach((checkbox)=>{
    checkbox.addEventListener("click",(e)=>{
        const allgoalsAdded = [...inputList].every((input)=>{
            return input.value
        });
        if(allgoalsAdded){
            checkbox.parentElement.classList.toggle("completed");
            errorLabel.style.display = "none";
            // progressValue.style.width = "33.3%";
            const inputId = checkbox.nextElementSibling.id;
            allGoals[inputId].completed = !allGoals[inputId].completed;
            completedGoalCount = Object.values(allGoals).filter((goal)=> goal.completed).length;
            progressValue.style.width = `${(completedGoalCount/3) *100}%`;
            progressValue.firstElementChild.innerText = `${completedGoalCount}/3 completed`;
            progressLabel.innerText = allQuotes[completedGoalCount];

            localStorage.setItem("allGoals", JSON.stringify(allGoals));

        }else{
            progressBar.classList.add("show-error");
        }
    })
})


inputList.forEach((input)=>{
    input.value = allGoals[input.id].name;
    if(allGoals[input.id].completed){
        input.parentElement.classList.add("completed")
    }
    input.addEventListener("focus",(e)=>{
        progressBar.classList.remove("show-error");
    })
    input.addEventListener("input",(e)=>{
        if(allGoals[input.id].completed){
            input.value = allGoals[input.id].name
            return
        }
        allGoals[input.id].name = input.value
        localStorage.setItem("allGoals", JSON.stringify(allGoals));
    })
})
