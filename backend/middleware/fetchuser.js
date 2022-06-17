const jwt =require("jsonwebtoken");
const fetchuser=async (req,res,next)=>{
    //get user from jwt tocken
    const tocken=req.header("auth-tocken");
    if(!tocken){
        res.status(401).send("Please login with valid tocken");    
    }
    try{
        const data=jwt.verify(tocken,"rama");
        req.user=data.user;
        next();
    }catch(error){
        res.status(401).send("Please login with valid tocken");    
    }
}
module.exports=fetchuser;