const cl = console.log;

const todoForm = document.getElementById("todoForm");
const todoList = document.getElementById('todoList')
const addTodoBtn = document.getElementById('addTodoBtn')
const todoInput = document.getElementById('todoInput')
const UpdateTodoBtn = document.getElementById('UpdateTodoBtn')






// let todosArr = [
//     {
//         todoItem: "HTML",
//         todoId: '123'
//     },
//     {
//         todoItem: "CSS",
//         todoId: '124'
//     },
//      {
//         todoItem: "JavaScript",
//         todoId: '125'
//     }
// ];


// localStorage.setItem('todosArr' , JSON.stringify(todosArr));
// todosArr data :: DB(localstorage) 


//API Call to GET todos data
let todosJson = localStorage.getItem("todosArr");
cl(todosJson)
let todosArr = JSON.parse(todosJson)    // JSON to convert JS array
cl(todosArr)



function editTodo(ele){
   
    let EDIT_ID = ele.closest('li').id;
    localStorage.setItem('EDIT_ID' , EDIT_ID)

    let EDIT_OBJ = todosArr.find(t => t.todoId === EDIT_ID)
    todoInput.value = EDIT_OBJ.todoItem


    addTodoBtn.classList.add('d-none')
    UpdateTodoBtn.classList.remove('d-none')
    
}

function onTodoUpdate(){
    let UPDATE_ID = localStorage.getItem('EDIT_ID')
    localStorage.removeItem('EDIT_ID')
    let UPDATED_OBJ = {
        todoItem : todoInput.value,
        todoId: UPDATE_ID
    }

    todoForm.reset()
    let getIndex = todosArr.findIndex(t => t.todoId === UPDATE_ID)
    todosArr[getIndex] = UPDATED_OBJ;
    localStorage.setItem('todosArr', JSON.stringify(todosArr))

    let li = document.getElementById(UPDATE_ID)
    li.querySelector('strong').innerText = UPDATED_OBJ.todoItem;

    UpdateTodoBtn.classList.add('d-none')
    addTodoBtn.classList.remove('d-none')

    swal.fire({
        title: `The todo item with ID ${UPDATE_ID} is updated successfully !!!`,
        timer: 1500,
        icon: 'success'
    })
}

function deleteTodo(ele){
    // cl(ele)
    let getconfirm = confirm(`Are you sure, you want remove the Todo Item?`)
    if(getconfirm){
            let REMOVE_ID = ele.closest('li').id;
            cl(REMOVE_ID)
            let getIndex = todosArr.findIndex(t => t.todoId === REMOVE_ID);
            todosArr.splice(getIndex , 1)

            localStorage.setItem('todosArr' , JSON.stringify(todosArr))
            ele.closest('li').remove()

             swal.fire({
                        title: `The todo item with ID ${REMOVE_ID} is remove successfully !!!`,
                        timer: 1500,
                        icon: 'success'
                  })
    }
    

    
}


function createTodoList(arr){
    let result =''
    arr.forEach(todo => {
        result += `
                     <li class="list-group-item d-flex justify-content-between align-items-center" id="${todo.todoId}">
                           <strong>${todo.todoItem}</strong> 

                           <div>
                             <i onclick="editTodo(this)" class="fa-solid fa-pen-to-square fa-2x text-primary" role="button"></i>
                             <i onclick="deleteTodo(this)" class="fa-solid fa-trash-can fa-2x text-danger" role="button"></i>
                           </div>
        `
    });
    todoList.innerHTML = result;
}

createTodoList(todosArr)


function onTodoAdd(eve){
    eve.preventDefault();

    let newTodo = {
        todoItem: todoInput.value,
        todoId: Date.now().toString()
    }
   
    todoForm.reset()
    todosArr.push(newTodo)
    
    localStorage.setItem('todosArr' , JSON.stringify(todosArr))
    let li = document.createElement('li');
    li.className =' list-group-item d-flex justify-content-between align-items-center';
    li.id = newTodo.todoId;
    li.innerHTML = `
    
                   <strong>${newTodo.todoItem}</strong>
                        <div>
                             <i onclick="editTodo(this)" class="fa-solid fa-pen-to-square fa-2x text-primary" role="button"></i>
                             <i onclick="deleteTodo(this)" class="fa-solid fa-trash-can fa-2x text-danger" role="button"></i>
                           </div>
    
    
    `
    todoList.append(li)

    swal.fire({
                        title: `The todo item with ID ${newTodo.todoId} is added successfully !!!`,
                        timer: 1500,
                        icon: 'success'
                  })
}




todoForm.addEventListener('submit', onTodoAdd)

 UpdateTodoBtn.addEventListener('click' , onTodoUpdate)