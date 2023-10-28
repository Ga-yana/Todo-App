
const User= require("../model/user")
const bcrypt= require("bcrypt")
const jwt= require("jsonwebtoken")

//registration
exports.createUser= async(req, res)=>{
   try {
    const {name, email, password} =req.body
    console.log(req.body)
    if(!(name && email && password)){
        res.status(400).send("Please fill all the details")
    }
    const existingUser= await User.findOne({email})
    if(existingUser){
        res.status(400).send("User already exists")
    }
    const encryptPassword= await bcrypt.hash(password, 10)
    const user= await User.create({
        name,
        email,
       password: encryptPassword
    })

    const token= jwt.sign({
        id: user._id,
        email 
    }, process.env.SECRET, {expiresIn: '2h'})
    
    user.token= token //token should be included in the model or else token is not being saved
    user.password= undefined
   
    res.status(200).json(user)

   } catch (error) {
    console.log(error)
    res.status(400).send("Error 400")
   }
}

//login
exports.login= async(req, res)=>{
    try {
        const {email, password}= req.body
        //keep the submit button inactive if both info is not entered
        const user= await User.findOne({email}) //very important ti use findOne, or get stuck for 5-7 days
        if (!(user)){
            res.status(400).send("Credentials wrong, please try again")
        }
        
        const comparePassword= await bcrypt.compare(password, user.password)
        if (!(comparePassword)){
            res.status(400).send("Credentials wrong, please try again")
        }

        const token= jwt.sign({id: user._id}, process.env.SECRET, {expiresIn: '2h'})
        const options={
            expires: new Date(Date.now()+ 3* 60* 60* 1000),
            httpOnly: true
        }
        res.status(200).cookie("token", token, options).send("You have logged in successfully!")
        //not sending json, not sending user details

    } catch (error) {
        console.log(error)
        res.status(400).send("Error 400")
    }
}

// exports.seeToDo= auth, (req, res) =>{

// };









// exports.checkingCookie= async(req, res)=>{
//     const {token}= req.cookies
//     if (!token){
//         res.status(400).send("token not recieved ")
//     }
//     // console.log(token)
//     // console.log(req.cookies)
//     try {
//         const decode=  jwt.verify(token, process.env.SECRET)
//         req.user= decode
//         // console.log(decode);
//     } catch (error) {
//         console.log(error);
//         res.status(400).send("couldnt decode")
//     }
//     const user= await User.findOne({_id: req.user.id})
//     if(!user){
//         res.status(400).send("something wrong")
//     }
//     console.log(user);
//     res.status(200).send(user)
// }










// exports.showAll= async(req, res)=>{
//     try {const all= await User.find()
//         console.log(all);
//         res.status(400).json({
//             success: true, 
//             all
//         })
        
//     } catch (error) {
//         console.log(error)
//         res.status(400).send("Error 400")
//     }
// }







