const mongoose= require("mongoose")

const connectToDB= ()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then((conn)=>{
        console.log(`Connected to ${conn.connection.host}`)
    })
    .catch((err)=>{
        console.log(err.message)
        process.exit(1)
    })
}

module.exports= connectToDB


// import React, { useState } from 'react'
// import axios from "axios"

// export const Create = () => {
//     const [title, setTitle]= useState("")
//     const [task, setTask]= useState("")
//     const allTask =[]
//     // should the database be connected everytime theres a new task, OR write all the task and then send it to db 
    
//     const sendTitle=async(event)=>{
//         event.preventDefault() 
//         const data={
//             title: title
//            }
//         const res= await axios.post("/createTodo", data)
//         setTitle("")
//     }
//     const sendTask=async(event)=>{
//         event.preventDefault()
//         const data={
//             task: allTask
//         }
//         const res= await axios.get("/createTaskTodo/:id", data)
//         console.log(task)
//         console.log(allTask)
//         setTask("")
//     }

//   return (
//     <div>
//     <form onSubmit={sendTitle}>
//     <input type="text" placeholder="Title.." className="input w-full max-w-xs text-2xl" value={title} onChange={(event)=>{setTitle(event.target.value)}}/>
//     <button type="submit">Submit</button>
//     </form>
//         {/* <div className="overflow-x-auto">
//   <table className="table w-full">
//     <tbody>
//       <tr>
//         <th>1</th>
//         <td><input type="text" value={task} onChange={(event)=>{setTask(event.target.value)}}/></td>
//       </tr>
//     </tbody>
//   </table>
// </div> */}


// <form onSubmit={sendTask}>
//     <div className='px-10 py-6'>
//         {/* <i class="fa-regular fa-square-plus" style="color: #000000;"></i> */}
//         <input type ="text" placeholder='Add a task'  onClick={(event)=>{
//             setTask(event.target.value)
//             allTask.push(task)
//             console.log(allTask)}} />
//         <button type="submit">Submit</button>
//     </div>
// </form>
//     </div>
//   )
// }



// import React, { useState } from 'react'
// import axios  from 'axios'

// export const View = () => {
//     const [task, setTask]= useState("Hi")
//     const displayTodo= async(event)=>{
//         // event.preventDefault()
//         // console.log(task)
        
//         try {
//           const resp= await axios.get("/getTodos")
//           const something= resp.data.map((agenda)=>
//             agenda.title
//           )
//           // console.log(resp.data.title);

//           const listItems = something.map(x =>
//             <li>
//               <p>
//                 To Do is
//                 {' ' + x + ' '}
//               </p>
//             </li>
//           );

//         } catch (error) {
//           console.log(error)
//           setTask("something is wrong")
          
//         }
//     }
//   return (
//     <div>
//         <button className='text-white p-3 rounded bg-sky-500 hover:bg-sky-700' onClick={displayTodo}>View all Todos in your list</button>
//         <h1>{task}</h1>
//     </div>
//   )
// }





// "proxy": "http://localhost:4000",