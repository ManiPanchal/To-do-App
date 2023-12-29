let new_ele=document.getElementById("area");
let list=document.getElementById("list");
let submit=document.getElementById("submit");
let file=document.getElementById("file");
let u=Math.random(),count=0;
const arr=[];
show_todo(function(todos)
{
    //console.log(todos);
    
    for(let i=0;i<todos.length;i++)
    {
       // console.log(todos[i]);
        let value=todos[i].task;
       let a=todos[i].flag;
       let u=todos[i].id;
       
       let f=todos[i].pic;
       create(value,a,u,f);
    }
  
})
submit.addEventListener("click",function()
 {
    // if(event.key=="Enter")
        {
            if(new_ele.value.trim()=="" || file.value=="")
                {
                    // new_ele.value="";
                    // file.value="";
                    alert("Please Fill all the details");
                 }
             else{
               // console.log(file.files[0]);
                createtodo(new_ele.value,0,Math.random(),file.files[0]);
                new_ele.value="";   
                file.value="";
                }
         }
 });
 function createtodo(value,a,u,f)
 {
    add_to_array(value,a,u,f);
     store(value,a,u,f);
    // create(value,a);
    
 }
 function create(value,a,u,f)
        {
            // console.log(arr);
            let listItem=document.createElement("li");
            listItem.setAttribute("id",u);
            let span=document.createElement("span");
            listItem.appendChild(span);
            if(a==1){
                span.classList.add('deco');
            }
            else if(a==0){
                span.classList.remove('deco');
            }
            span.textContent=value;
            let input=document.createElement("input");
            input.value=value;
            input.style.display="none";
            listItem.appendChild(input);
            
            listItem.innerHTML=listItem.innerHTML+'<i class="material-symbols-outlined">close</i>';
           
            listItem.innerHTML=listItem.innerHTML+'<i><input type="checkbox" id="check"></i>';
            listItem.innerHTML=listItem.innerHTML+`<img src="/profile/${f}">`;
            
            if(a==1){
                listItem.querySelector("#check").checked=true;
            }
            else if(a==0){
                listItem.querySelector("#check").checked=false;
            }
             listItem.querySelector(".material-symbols-outlined").addEventListener("click",cut);
            
             listItem.querySelector("#check").addEventListener("click",box);
            list.appendChild(listItem);
            
            count++;

        }
        function box(r)
        {
             
             let a=r.target.parentNode.parentNode.id;
             //console.log(a);
             const request =new XMLHttpRequest();
             request.open("POST","/checkbox");
             request.setRequestHeader("content-type","application/json");
             request.send(JSON.stringify({"f":a}));
             request.addEventListener("load",function()
             {
                if(JSON.parse(request.responseText))
                {
           
                   r.target.parentNode.parentNode.querySelector("span").classList.add('deco');
                 }
                 else{
               
                   r.target.parentNode.parentNode.querySelector("span").classList.remove('deco');  
                }
             })
             
           
        }
        function cut(r)
        {
            let d=r.target.parentNode.id;
            const request=new XMLHttpRequest();
            request.open("POST","/delete_todo");
            request.setRequestHeader("Content-type","application/json");
            request.send(JSON.stringify({"id":d}));
             r.target.parentNode.remove();
             
        }
        function add_to_array(value,a,u,f)
        {
            let ob={"task":value,"flag":a,"id":u,"pic":f};
            arr.push(JSON.stringify(ob));
        }
        function store(value,a,u,f)
        {
            const request=new XMLHttpRequest();
            request.open("POST","/savetodo");
           // request.setRequestHeader("content-type","multipart/form-data")
           
            let b=new FormData();
            b.append("task",value);
            b.append("flag",a);
            b.append("id",u);
            b.append("pic",f);
            request.send(b);
         //   request.send(JSON.stringify({"task":value,"flag":a,"id":u,"pic":f}));
          // request.send(JSON.stringify(arr));
            request.addEventListener("load",function()
            {
                f=request.responseText;
                // cre(value,a,u,f);
                create(value,a,u,f)
            })
        }
        function show_todo(callback)
        {
            const request=new XMLHttpRequest();
            request.open("GET","/show_todo");
            request.send();
            request.addEventListener("load",function()
            {
               
                callback(JSON.parse(request.responseText));
            })
        }