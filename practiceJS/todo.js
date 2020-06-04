const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos"

let toDos = [];

function deleteToDo(){
    const btn = event.target; 
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){ //filter function checks all element in the array and return matched value.
        return toDo.id !== parseInt(li.id); //parseInt convert strings to integer 
    });
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos)) //JSON(javascript object notation).stringify converts integers to string
}

function paintToDo(text){
    const li = document.createElement("li"); //createElement create a component in the bracket in HTML document
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length +1;
    delBtn.innerText = "❌"; //if you want to enter emojis, push window btn and ';'
    delBtn.addEventListener("click",deleteToDo); //addEventLisner lets JS do something in the bracket(define event, function to do)
    span.innerText = text //=<span>text</span>
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}   

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value="";
    //saveName(currentValue);
}    

function something(toDo){
    paintToDo(toDo.text);
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(something);
    }
    
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();