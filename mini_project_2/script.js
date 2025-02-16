function getNewTODO(todo) {
    const newTodo = document.createElement("li");
    newTodo.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
    newTodo.innerHTML = `<span></span> <i class="far fa-trash-alt delete"></i>`;
    newTodo.children[0].innerText = todo;
    newTodo.children[1].addEventListener("click", () => {
        newTodo.remove();
    });
    return newTodo;
}

function filterTODOs(){
    for (let node of todos.children){
        if (node.children[0].innerText.includes(searchInput.value)) {
            node.style.setProperty("display", "", "important");
        } else{
            node.style.setProperty("display", "none", "important");
        }
    };
}

function addTODO(query){ 
    const newTODO = getNewTODO(addInput.value);
    if (!query.includes(searchInput.value)) newTODO.style.setProperty("display", "none", "important");
    todos.append(newTODO);
}

const todos = document.querySelector(".todos");
const addInput = document.getElementsByName("add")[0];

document.forms[1].addEventListener("submit", (event)=>{
    event.preventDefault();
    addTODO(addInput.value);
    document.forms[1].reset();
});

document.forms[0].addEventListener("submit",(event)=>{event.preventDefault();});
const searchInput = document.getElementsByName("search")[0];
searchInput.addEventListener("input", ()=>{
    filterTODOs();
});





