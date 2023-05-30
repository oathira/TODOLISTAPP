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

// function will trigger when we press addicon 
function handleInputKeypress(e){
  if(e.type === 'click'){
      const text = addTaskInput.value;//This will read the value of added text
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

// function used for adding a task
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

// function to display all tasks
function renderList() {
  
  taskList.innerHTML = '';
  for(let i = 0; i<tasks.length; i++){
       addTaskToDOM(tasks[i]);
   }
   taskCounter.innerHTML = tasks.length;
  
}

// This function used to add list elements to DOM
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

// function used to mark a task as completed
function toggleTask(taskId){
   const taskToggle = tasks.filter(task=>{
     return task.id === taskId;
   }
   );
   if(taskToggle.length>0){
       const currentTask = taskToggle[0];
       currentTask.done =! currentTask.done;  //eg:if done is false this will set done as true 
       renderList();
       showNotification('task toggled successfully');
       return;
 }
   showNotification('coudnt toggled the task');
}

// function to delete all tasks
function clearAll(){
  tasks.splice(0);  //this will delete all elements from tasks array
  renderList();
  showNotification('tasks deleted successfully');
}
  
// function to delete all completed tasks
function clearComplete(){
   var completedElement = document.querySelectorAll('.custom-checkbox'); 
   var temp = []; 

   for (var i = 0; i < tasks.length; i++) {
     if (completedElement[i].checked === true) {
        temp.push(tasks[i]);
      }
   }
   
   var j = 0;
   for (i = 0; i < tasks.length; i++) {
      if (tasks[i] === temp[j]) {
        tasks.splice(i, 1);
        j++;
        i--;
      }
    }
   renderList(); 
   showNotification('cleared completed tasks sucessfully ');

}


// function to delete a task
function deleteTask(taskId){
   const newTasks = tasks.filter(task=>{   //newtasks will get an array which doesn't include deleted task
       return task.id !== taskId });
   tasks = newTasks;
   renderList();
   showNotification('tasks deleted successfully');
}



// function to display all tasks
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

  








 















   

    

