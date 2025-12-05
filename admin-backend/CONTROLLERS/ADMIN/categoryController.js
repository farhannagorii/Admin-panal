import categoryModel from "../../MODELS/categoryModel.js";


export let categoryinsert = async (req, res) => {

    try {
        //   console.log(req.body)
        //   console.log(req.file)
        let { categoryName, order } = req.body;
        let obj = {
            categoryName,
            categoryOrder: order,
            categoryStatus: true
        }
        if(req.file) {
            if(req.file.filename != "undefind", req.file.filename != " ", req.file.filename != null) {
                obj["categoryImage"] = req.file.filename;
            }
        }
        let category = await categoryModel(obj)
        let categoryres = await category.save()

        console.log(categoryres)

        res.status(200).json({ massage: "category inserted successfully.", categoryres })
    } catch (error) {
        res.status(400).json({ massage: "category inserted error.", error })
    }

};


 export let categoryview = async (req, res) => {

    let categoryview = await categoryModel.find()
     let staticPath = process.env.STATICPATH+"/uploads/category/"
    res.status(200).json({ massage: "category inserted successfully.", staticPath, categoryview })

}

 

export let categorystatus = async(req, res)=>{
    let {id}=req.params;
    let {status}=req.body;
 let categorystatus = await categoryModel.updateOne({_id:id},{
    categoryStatus:status
 })

 res.status(200).json({ massage: "category update successfully.", categorystatus })
}




export let editdata = async(req ,res)=>{
 let {id}=req.params;
 let categoryview = await categoryModel.findOne({_id:id})
 let staticPath = process.env.STATICPATH+"/uploads/category/"
  res.status(200).json({ massage: "category row data get successfully.", staticPath,categoryview })
}

export let updatedata = async(req ,res)=>{
    try {
        //   console.log(req.body)
        //   console.log(req.file)
        let {id}=req.params
        let { categoryName, order } = req.body;
        console.log(req.body)
        let obj = {
            categoryName,
            categoryOrder: order,
         
        }
        if (req.file) {
            if (req.file.filename != "undefind", req.file.filename != " ", req.file.filename != null) {
                obj["categoryImage"] = req.file.filename;
            }
        }
        let category = await categoryModel.updateOne({_id:id},{$set:obj})
     


        res.status(200).json({ massage: "category update successfully.", category })
    } catch (error) {
        res.status(400).json({ massage: "category update error.", error })
    }

    
}


export let categorydelete= async(req ,res)=>{
    let {ids}=req.body
    console.log(ids)
    let delteids = await categoryModel.deleteMany({ _id: { $in: ids } })

    res.send({
        status:1,
        message:"category data delted",
        delteids
    })
}