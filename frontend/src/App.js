import { useCallback, useEffect, useState } from "react"
import axios from "axios"
  

function ShowAll(){ 
  const [todo, setTodo]= useState([])
  const [presentTodo, setPresentTodo]= useState(null)
  const [presentTask, setPresentTask]= useState(null)
  const [editToggle, setEditToggle]= useState(false)

  //Display all Todos
  async function diducall(){
    let res= await axios.get("getTodos")
    const all= res.data
    const show= all.map((content)=>{
      return setTodo((todo) => [...todo, content.title])
    })
  }

  //Delete a Todo
  const deleteTodo= useCallback(async () => {
    const res= await axios.delete(`/deleteTodo/${presentTodo}`)
    console.log(res)
  },[presentTodo])

  // useEffect(()=>{diducall()},[deleteTodo])

  //Display tasks of selected Todo
  const [task, setTask] =useState(null)
  async function fetchTask (title) {
    setPresentTodo(title)
    const res= await axios.get(`/getTodo/${title}`)
    setTask(res.data.task)
    console.log(res.data.task)
  }

  //Edit Todo name

  //Edit Task name
  const editTask= async (item) => {
    console.log(item)
    const data= {
      data: item
    }
    try {
      const res= await axios.put(`/deleteTaskTodo/${presentTodo}`, data)
      console.log(res)
      
    } catch (error) {
      console.log(error)
      console.log(error.message)
    }
  }

  //Delete Task
  const deleteTask= async (item) => {
    console.log(item)
    const data= {
      data: item
    }
    try {
      const res= await axios.put(`/deleteTaskTodo/${presentTodo}`, data)
      console.log(res)
      
    } catch (error) {
      console.log(error)
      console.log(error.message)
    }
  }

  return (
    <>
     <div className="flex flex-col gap-4">
      <button onClick={diducall} className="border-lime-300 border-[3px] focus:border-amber-500 p-2 rounded-xl max-h-14 max-w-{30px}">View all Todos </button>
      <div className="flex flex-row gap-4">
       <div className="ml-10">
        {todo && todo.map((content, index) => (
         <ul>
          <li key={index} ><button className="hover:text-pink-400 focus:text-orange-500" onClick={()=> fetchTask(content)}>{content}</button>
          </li>
         </ul>
    ))} 
       </div>
       <div>
      {task? <div>
        <div className="flex flex-row gap-3">
          <div>{presentTodo}</div>
          <div>{editToggle? <button className="border-white">Edit</button> : <div></div>}</div>
          <button onClick={() => setEditToggle(!editToggle)} ><i className="fa-solid fa-pen"></i></button>
          <button onClick={deleteTodo}><i className="fa-solid fa-trash"></i></button>
        </div>
        <div className="">{task.map((items, index) => (
          <div className="flex flex-row gap-3">
            <div key={index}>{index+1}  <span className="text-amber-200">{items}</span></div>
            {editToggle? <div className="flex flex-row gap-3">
              <button 
              className="border-white"
              onClick={()=>{editTask(items)}}>Edit</button>
              <button 
              onClick={() => {
              deleteTask(items)}}>
                <i className="fa-solid fa-trash"></i></button>
            </div>  : <div></div>}
          </div>
      ))}</div>
      </div>  : <div></div> }
       </div>
      </div>
     </div>
    </>
  )
}



function AddATodo(){
  const [title, setTitle]= useState("")
  const [task, setTask]= useState([])
  const [variable, setVariable]= useState("")
  const sendTitle= async(event) =>{
    event.preventDefault()
    const data={
      title: title
    }
    try {
      const res= await axios.post("/createTodo", data)
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
  const form= (e)=>{
    e.preventDefault()
    setTask((task) => [...task, variable])
    setVariable(" ")
  }
  
  const sendTask= async(e)=>{
    e.preventDefault()
    console.log(task)
    try {
      const res= await axios.put(`/createTaskTodo/${title}`, task)
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  return(
    <>
    <div>
     <form>
        <input type="text" placeholder="Add a Todo" value={title} 
         className="text-stone-800 font-medium rounded-xl border-lime-300 border-[3px] focus:outline-none focus:border-amber-500 p-2 my-2"  onChange={(event) => {setTitle(event.target.value)}}/>
        <button onClick={(event) => sendTitle(event)} className="ml-4"><i className="fa-solid fa-arrow-right"></i></button>
     </form> 
     <form>  
        <input type="text" placeholder="What do you want to do?" onChange={(event) => setVariable(event.target.value)} value={variable}
          className="text-stone-800 font-medium rounded-xl border-lime-300 border-[3px] focus:outline-none focus:border-amber-500 p-2 my-2"/>
        <button onClick={(e) => form(e)} className="inline ml-4"><i className="fa-regular fa-square-plus"></i></button>
        <button onClick={(e)=>sendTask(e)} className="inline ml-4">Done</button>
     </form>
     <div>
        {task && task.map((x, index) => (
        <ul>
          <li key={index} >{index+1}:<span className="ml-3"/>{x}</li>
        </ul>
      ))}
     </div>
    </div>
    </>
  )
}



function SearchTodo(){
  const [title, setTitle]= useState('')
  const [task, setTask] =useState(null)
  let res;
  async function search(event){
   event.preventDefault()
   res= await axios(`/getTodo/${title}`)
   setTask(res.data.task)
   console.log(res.data.task)
}
  
  
  return(
    <>
  <div className="flex flex-col gap-4">
    <form>
        <input type="text" placeholder="Search a Todo" onChange={(event) => setTitle(event.target.value)} 
        className="text-stone-800 font-medium rounded-xl border-lime-300 border-[3px] focus:outline-none focus:border-amber-500 p-2 my-2"/>
        <button onClick={(event)=> search(event)} className="ml-4 "><i className="fa-solid fa-arrow-right"></i></button>
    </form>
    <div>
      {task? <div  className="border-lime-300 border-[3px] mt-4 p-2 rounded-xl">{task.map((items, index) => (
        <div key={index}>{index}  <span className="text-amber-200">{items}</span></div>
      ))} </div> : <div></div>}
    </div>
  </div>
    
    </>
  )
}


function App() {

  return (
    <>
    <div className="bg-teal-900 text-white h-screen mx-auto">
     <div className=" border border-white">
      <h1 className="mb-8 text-3xl font-semibold">Hello User</h1>
      <div className="flex flex-row justify-around  border border-white">
        <ShowAll/>
        <AddATodo/>
        <SearchTodo/>
      </div>
      
     </div>
    </div>
    </>
  )
}

export default App





{/* <i class="fa-solid fa-eye"></i>
<i class="fa-solid fa-eye-slash"></i> */}