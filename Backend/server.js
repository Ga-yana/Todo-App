const app= require("./app")

const PORT= process.env.PORT||4000

app.listen(PORT, ()=>{
    console.log(`App is listening to http://localhost:${PORT}`)
})