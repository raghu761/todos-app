
const readTodos2= ()=>{
    return fetch('http://localhost:5000/random',{
        method : 'GET'
    })
    .then(response => response.json())
    .catch(error => console.log(error))
}

const hello = (index) => {
    console.log("hello here " + index);
}

const readTodos =()=>{
    readTodos2()
    .then(todos=>{
        let str= "";
        todos.forEach((todo , index)=>{
            str+= (`<tr>
                <th scope="row">${index+1}</th>
                <td>${todo.name}</td>
                <td> <button class="btn btn-primary" onClick=deleted("${todo._id}")>Delete</button> </td>
        </tr>`)
        })

        const body =document.getElementById("tableBody");
        body.innerHTML =str;
    })
}

readTodos();

const writetodos = () =>{
    readTodos();
        const _title= document.getElementById("title");
        const title_val = _title.value;
    
         fetch('http://localhost:5000/random',{
            method :  'POST',
            body :JSON.stringify({
                "name": title_val
            }),
            headers : {
                "Content-Type" : "application/json"
            }

        }) 
        .then(response  => readTodos())
        .catch(error => console.log(error))

        

        const title = document.getElementById("title");
        title.value = "";
}


const deleted = (index)=>{
    

        fetch(`http://localhost:5000/random/${index}`,{
            method: 'DELETE'
        }).then(response => {
            readTodos();
        }).catch(error => console.log(error));

        // console.log(`http://localhost:5000/random/${index}`);
        
        // let body = document.getElementById("tableBody");
        // body.innerHTML = str;

}

btn = document.getElementById("add");
btn.addEventListener("click",writetodos);
