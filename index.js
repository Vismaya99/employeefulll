
const express=require('express');
const Bodyparser=require('body-parser');
const mongoose=require('mongoose');
const cors=require('cors');
const path=require('path');
 const  employeeModel  = require('./models/Users');
var app=new express();

app.use(Bodyparser.json());
app.use(Bodyparser.urlencoded({extended:false}));
app.use(cors()) ;

mongoose.connect('mongodb+srv://vismayashankar:mymongoias@cluster0.kvq8zfx.mongodb.net/employeeDB?retryWrites=true&w=majority',{
    useNewUrlParser: true
});




app.post('/form',async(req,res)=>{
    console.log(req.body)
    var employee=new employeeModel(req.body);
  await  employee.save(
        (err,data)=>{
            if (err) {
                res.json({"status":"error","error":err})
            } else {
              res.json({"status":"success","data":data})  
            }
        }
    );
})






app.get('/',(req,res)=>{
    employeeModel.find((err,data)=>{
       if (err) {
           res.json({"status":"error","error":err})
       } else {
           res.json(data);
       }

       }
    )
   })




  

app.post('/login',async(req,res)=>{
    try {
        var result=await employeeModel.find(
            {
                $and:[{"username":req.body.username},{"password":req.body.password}]
            }
        )
        res.send({"data":result})
    } catch (error) {
        res.send({"status":"error","error":error})
    }
})
    

    














app.delete('/delete',(req,res)=>{
   
    
    var id=req.params.id;
    employeeModel.deleteOne(
        {_id:id},(err,data)=>{
            if (err) {
                res.json({"status":"error","error":err})
            } else {
                res.json({"status":"deleted","data":data})
            }
        }
    )
})




app.put('/edit',(req,res)=>{
           
    var name=req.body.name;
    var data=req.body;
   employeeModel.findOneAndUpdate(
    {"name":name},data,(err,data)=>{
        if(err){
            res.json({"status":"error","error":err})
        }
        else{
            res.json({"status": "updated","data": data});
        }
    }
        
    )}
   ) 




app.listen(4000,()=>{
    console.log("server started");
});