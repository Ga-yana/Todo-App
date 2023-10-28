const Todo= require("../model/todo")

exports.home= (req, res)=>{
    res.status(200).send("Hello, welcome to the new world")
}

//when clicked the data should be already written
exports.createTodoController= async(req, res)=>{
try {
    const {title}= req.body
    console.log(req.body)
    const todo= await Todo.create({title})
    // console.log(title)
    res.status(200).json(todo)
} catch (error) {
    console.log(error)
}
}

exports.getTodosController= async(req, res)=>{
    try {
        const getTodo= await Todo.find()
        if(!getTodo)
        return res.status(400).send("An error has occured")
        res.status(200).json(getTodo)
    } catch (error) {
        console.log(error)
    }
}

exports.getTodoController= async (req, res)=>{
    try {
        const {id}= req.params
        const todo= await Todo.findOne({ title:id })
        if(!todo)
        {res.status(400).send("Todo is not found")}
        res.status(200).json(todo)
    } catch (error) {
        console.log(error)
    }
}

exports.updateTodoController= async(req, res)=>{
  try {
    // const {todoId}= req.params
    // const todo= await Todo.findByIdAndUpdate(req.params.todoId, req.body)
   // always minor errors
    const todo= await Todo.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({
            success: true,
            message: "updated the title of todo"
        })
  } catch (error) {
    console.log(error);
        res.status(401).json({
            success:false,
            message: error.message
        })
  }
}

exports.deleteTodoController= async (req, res)=>{
    try {
        const todoId= req.params.id
        // console.log(req.params.id)
        // console.log(todoId)
        const todo= await Todo.findOneAndDelete({title: todoId})
        console.log(todo)
        if (!todo)
        return res.status(400).send("Todo is not found")
        res.status(200).json({
            success:true,
            message: "User deleted successfully"
        })
    } catch (error) {
        console.log(error)
    }
}

exports.createTaskTodoController= async(req, res)=>{
    try {
        const todoId=req.params.id
        console.log(todoId)
        const todo= await Todo.findOne({title: todoId})
        console.log(todo)
        if (!todo)
        console.log("something wrong")
        const text= req.body 
        console.log(req.body)// displayed undefined until data was sent in an object form
        text.map((content)=>{
            todo.task.push(content)
        })
        // todo.task.push(text)
        await todo.save()
        res.status(200).json({
            success: true,
            message: "task added successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

exports.getTasksTodoscontroller= async(req, res)=>{
    try {
        const todoId= req.params.id
        const todo= await Todo.findById(todoId)
        res.status(400).json({
            task: todo.task
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success:false,
            message: "error has occured"
        })
    }
}

// exports.updateTaskTodoController= async (req, res)=>{
//     try {const todoId=req.params.id
//         const {data}= req.body
//         const todo= await Todo.findById(todoId)
//         const index= todo.task.indexOf(data)
//         todo.task.splice(index, 1, )
//         await todo.save()
//         res.status(200).json({
//             success: true,
//             message: "task deleted successfully"
//         })
        
//     } catch (error) {
//         console.log(error)
//         res.status(400).json({
//             success: false,
//             message: error.message
//         })
//     }
// }

exports.deleteTaskTodoController= async(req, res)=>{
    try {
        const todoId=req.params.id
        console.log(todoId)
        const todo= await Todo.findOne({title:todoId})
        console.log(todo)
        if (!todo)
        console.log("something wrong")
        const {data}= req.body
        console.log(data)
        const index= todo.task.indexOf(data)
        todo.task.splice(index, 1)
        await todo.save()
        res.status(200).json({
            success: true,
            message: "task deleted successfully"
        })
       
        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: error.message
            })
    }
}