import loginModel from "../../MODELS/authModel.js"

export let loginUser = async (req, res) => {


    let { userName, password } = req.body
    console.log(req.body)

    let user = await loginModel.findOne({ loginName: userName, loginPassword: password })
    if (user) {
        res.send({
            status: 1,
            massage: "you have login",
            user
        })


    } else {
        res.send({
            status: 0,
            massage: "invalid data"
        })
    }
}

export let changepassword =async(req,res)=>{
    let {curentpassword,newpassword}=req.body;
    let {userid}=req.params;
    let obj

    let user = await loginModel.findOne({_id:userid,adminpassword:curentpassword})

    if(user){
        let updatedata = await loginModel.updateOne({_id:userid},{$set:{loginPassword:newpassword}})
         obj={
            status:1,
            massage:"password changed",
            updatedata
        }

    }
    else{
          obj={
            status:0,
            massage:"password changed error",
        }
    }

    res.send(obj)
}