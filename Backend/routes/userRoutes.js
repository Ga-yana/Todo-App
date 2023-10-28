const express= require("express")
const router= express.Router()
const {createUser, login, showAll, checkingCookie}= require("../controller/userControllers")
const {home, createTodoController, 
    getTodosController, 
    getTodoController, 
    deleteTodoController, 
    updateTodoController, 
    createTaskTodoController, 
    getTasksTodoscontroller,
    deleteTaskTodoController}= require("../controller/todoControllers")


router.post("/createUser", createUser)
router.post("/login", login)
// router.get("/showAll", showAll)
// router.get("/checkingCookie", checkingCookie)

router.get("/", home)
router.post("/createTodo", createTodoController)
router.get("/getTodos", getTodosController)
router.get("/getTodo/:id", getTodoController)
router.put("/updateTodo/:id", updateTodoController)
router.delete("/deleteTodo/:id", deleteTodoController)
router.put("/createTaskTodo/:id", createTaskTodoController)
router.get("/getTasksTodos/:id", getTasksTodoscontroller)
router.put("/deleteTaskTodo/:id", deleteTaskTodoController)

module.exports= router;