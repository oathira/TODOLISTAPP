// array to store taskslist
let tasks = [];

// to get elements with specified id 
const addTaskInput = document.getElementById('txt-item');
const inputIcon = document.getElementById('add');
const taskList = document.getElementById('list-container');
const taskCounter = document.getElementById('task-count');

function initializeApp(){
  inputIcon.addEventListener('click', handleInputKeypress);
  document.addEventListener('click', handleClickListener);
 } 

initializeApp();

 // function to show notification
function showNotification(text){
  alert(text);
}

// 
function handleInputKeypress(e){
  if(e.type === 'click'){
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
      addTaskInput.value = ''; 
      addTask(task);
    }
}


function addTask(task){
  if(task){
      tasks.push(task);
      renderList();
      showNotification('tasks added successfully');  
      return;
    }
  else{
     showNotification('tasks cant be added'); 
    }     
}


function renderList() {
  
  taskList.innerHTML = '';
  for(let i = 0; i<tasks.length; i++){
       addTaskToDOM(tasks[i]);
   }
   taskCounter.innerHTML = tasks.length;
  
}


function addTaskToDOM(task){
  
  const li=document.createElement('li');
  li.classList.add('list-item');
  li.innerHTML = `
               <input type = 'checkbox' id = '${task.id}' ${task.done ? 'checked' : ''} class = 'custom-checkbox'>
               <label for = '${task.id}'>${task.text}</label>
               <img src = 'images/delete.png' class = 'delete' data-id = '${task.id}' />   `;   
  taskList.append(li);
}


function handleClickListener(e){
    const target = e.target;
    if(target.className === 'delete'){
         const taskId = target.dataset.id;
         deleteTask(taskId)
          return;
      }
    else if(target.className === 'custom-checkbox'){
         const taskId = target.id;
        toggleTask(taskId)
        return;
      }
}


function toggleTask(taskId){
   const taskToggle = tasks.filter(task=>{
     return task.id === taskId;
   }
   );
   if(taskToggle.length>0){
       const currentTask = taskToggle[0];
       currentTask.done =! currentTask.done;
       renderList();
       showNotification('task toggled successfully');
       return;
 }
   showNotification('coudnt toggled the task');
}



function clearAll(){
  tasks.splice(0);
  renderList();
  showNotification('tasks deleted successfully');
}
  

function clearComplete(){
   var inputElems = document.querySelectorAll('.custom-checkbox'); // Select selected task in list
   var temp = []; // create  new arr for store completed task

   for (var i = 0; i < tasks.length; i++) {
     if (inputElems[i].checked === true) {
        temp.push(tasks[i]);
      }
   }
   
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



function deleteTask(taskId){
   const newTasks = tasks.filter(task=>{
       return task.id !== taskId });
   tasks = newTasks;
   renderList();
   showNotification('tasks deleted successfully');
}




function displayAllTasks() {
  const tasks = document.querySelectorAll('#list-container li');
  tasks.forEach(task => {
      task.style.display = 'flex';
     }
  );
}


// function to display uncompleted tasks
function displayPendingTasks() {
   const tasks = document.querySelectorAll('#list-container li');
   tasks.forEach(task => {
    const checkbox = task.querySelector('.custom-checkbox');
      if (checkbox.checked) {
          task.style.display = 'none';
      }
      else{
          task.style.display = 'flex';
      }
  }
  );
}
   


// function to display completed tasks
function displayCompletedTasks() {
  const tasks = document.querySelectorAll('#list-container li');
  tasks.forEach(task => {
      const checkbox = task.querySelector('.custom-checkbox');
      if (checkbox.checked) {
          task.style.display = 'flex';
      } else {
          task.style.display = 'none';
      }
  }
  );
}

  








 















   

    

