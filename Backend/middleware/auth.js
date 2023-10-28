const app= require("../app")

exports.auth= async(req, res, next)=>{
    const {token}= req.cookies
    if (!token){
        res.status(400).send("token not recieved ")
    }
    // console.log(token)
    // console.log(req.cookies)
    try {
        const decode=  jwt.verify(token, process.env.SECRET)
        req.user= decode
        // console.log(decode);
    } catch (error) {
        console.log(error);
        res.status(400).send("couldnt decode")
    }
    const user= await User.findOne({_id: req.user.id})
    if(!user){
        res.status(400).send("something wrong")
    }
    console.log(user);
    res.status(200).send(user)
    next()
}