
let tasks=[];
const addTaskInput=document.getElementById("txt-item");
const inputIcon=document.getElementById("add");
const taskList=document.getElementById("list-container");
const taskCounter=document.getElementById("task-count");

function  addTaskToDOM(task){
  const li=document.createElement("li");
  li.classList.add("list-item");
  li.innerHTML = `
               <input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ''} class="custom-checkbox">
               <label for="${task.id}">${task.text}</label>
               <img src="images/delete.png" class="delete" data-id="${task.id}" />   `;   
          
    taskList.append(li);
    }

    function renderList () {
     taskList.innerHTML = '';
      for(let i=0; i<tasks.length; i++){
          addTaskToDOM(tasks[i]);
      }
      taskCounter.innerHTML = tasks.length;
  }

function toggleTask(taskId){
   const taskToggle= tasks.filter(task=>{
     return  task.id===taskId
   });
   if(taskToggle.length>0){
    const currentTask=taskToggle[0];
    currentTask.done=!currentTask.done;
    renderList();
    showNotification("task toggled successfully");
    return;
 }
 showNotification("coudnt toggled the task");
}




function deleteTask(taskId){
  const newTasks=tasks.filter(task=>{
       return task.id !== taskId });
  tasks=newTasks;
  renderList();
  showNotification("tasks deleted successfully");
}


function removeAll(){
  tasks.splice(0);
 
  renderList();
  showNotification("tasks deleted successfully");
 
}

function complete(){
 var inputElems = document.querySelectorAll(".custom-checkbox"); // Select selected task in list
 var temp = []; // cretae  new arr for store completed task



  for (var i = 0; i < tasks.length; i++) {
      if (inputElems[i].checked === true) {
          temp.push(tasks[i]);
      }}

  
  var j = 0;
  for (i = 0; i < tasks.length; i++) {
      if (tasks[i] === temp[j]) {
        tasks.splice(i, 1);//if task store in temp array than remove from item array
          j++;
          i--;//Array.length -1 because 1 element splice than i-- use for back
      }
  }
    renderList(); 

}
    
 




function showNotification(text){
  alert(text);
}

function addTask(task){
  if(task){
      tasks.push(task);
     
      renderList();
      showNotification("tasks added successfully");  
      return;
}
else{
  showNotification("tasks  cant added "); 
}
}
function handleClickListener(e){
   const target = e.target;
   if(target.className === "delete"){
    const taskId=target.dataset.id;
    deleteTask(taskId)
    return;
   }
   else if(target.className === 'custom-checkbox'){
    const taskId=target.id;
    toggleTask(taskId)
    return;
   }


}

function handleInputKeypress(e){
  if(e.key === 'Enter' || e.type === 'click'){
      const text = addTaskInput.value;
      if(!text){
          showNotification('Task text cannot be empty') ; 
          return;
      }
      const task = {
          text,
          id:Date.now().toString(),
          done:false
      }
      addTaskInput.value = ''; // Use addTaskInput instead of e.target
      addTask(task);

  }
  
}
 function initializeApp(){
  inputIcon.addEventListener('click', handleInputKeypress);
  document.addEventListener('click',handleClickListener);
 } 
initializeApp();




// javascript on filtter data;



// function to show all tasks
function displayAllTasks() {
   
    // // show all tasks
    const tasks = document.querySelectorAll('#list-container li');
    tasks.forEach(task => {
        task.style.display = 'flex';
       
    });
 
  }



// function to show uncompleted tasks
function displayPendingTasks() {
 
    // hide completed tasks and show uncompleted tasks
    const tasks = document.querySelectorAll('#list-container li');
    tasks.forEach(task => {
        const checkbox = task.querySelector('.custom-checkbox');
        if (checkbox.checked) {
            task.style.display = 'none';
        } else {
            task.style.display = 'flex';
        }
    });
  
}

// function to show completed tasks
function displayCompletedTasks() {

    // hide uncompleted tasks and show completed tasks
    const tasks = document.querySelectorAll('#list-container li');
    tasks.forEach(task => {
        const checkbox = task.querySelector('.custom-checkbox');
        if (checkbox.checked) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    });
 
}



