const router=require('express').Router()
const db=require('../../db')

router.post('/createuser',(req,res)=>{
    try{
       const inputs=req.body
       let users=db.users
       users=[inputs,...users]
       db.users=users
       return res.status(201).json({message:"user Creare Sucessfully.."})
    }
    catch(err){
        return res.status(500).json({message:"User Create Failure"})
    }
})

router.get('/users',(req,res)=>{
    try{
        const users=db.users || []
        return res.status(202).json(users)
    }catch(err){   
        res.status(500).json({message:"get user failure"})

    }
})


router.get('/user/:id',(req,res)=>{
    try{
        const users=db.users || []
        const {id}=req.params
        let user;
       users.forEach((use)=>{
           if(use.id==id){
               user=use
           }
       })
       if(user){
           res.status(200).json(user)
       }
    }
    catch(err){
        res.status(500).json({message:"get user sucessfully"})

    }
})


router.put('/updateuser/:id',(req,res)=>{
    try{ 
         let users=db.users
        const inputs=req.body
        const {id}=req.params
        const indexOfUser=users.findIndex((use)=>{
            return use.id==id
        })
        if(indexOfUser==-1){
            throw new Error("no-user-found")
        }
        users[indexOfUser]=inputs
        users[indexOfUser].id=id
        db.users=users
        return res.status(202).json({message:"update user sucessfully"})
    }
    catch(err){
        res.status(500).json({message:"user update fail"})

    }
})


router.delete('/deleteuser',(req,res)=>{
    try{
        let users=db.users
        const {id}=req.params
        const indexOfUser=users.findIndex((use)=>{
            return use.id==id
        })
        if(indexOfUser==-1){
            throw new Error("No User Found")
        }
        users.splice(indexOfUser,1)
        db.users=users
        return res.status(201).json({message:"user delete sucessfully"})
    }
    catch(err){
        res.status(501).json({message:"user delete failure"})

    }

})

module.exports=router