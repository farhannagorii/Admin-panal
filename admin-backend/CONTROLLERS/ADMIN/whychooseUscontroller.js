import WhyChooseUsModel from "../../MODELS/whyChooseUsmodel.js"

export let detailinsert = async(req ,res)=>{
  try {
     console.log(req.body)
   console.log(req.file)
   let {titleName ,Order,discription}=req.body
   let obj={
    titleName,
    Order,
    discription
   }
   if(req.file){
    if (req.file.filename != "undefind", req.file.filename != " ", req.file.filename != null) {
                obj["titleImage"] = req.file.filename;
            }
   }
 
   let storydetails = await  WhyChooseUsModel(obj)
   let storydetailsres = await storydetails.save()
   
   res.send({
    status:1,
    massage:"why choose us insert succesfully",
    storydetailsres,
   })
  } catch (error) {
      res.send({
    status:0,
    massage:"why choose us insert error",
    error
   })
  }

}


export let titleview = async(req ,res)=>{

    let titledata = await WhyChooseUsModel.find()

     res.send({
    status:1,
    massage:"why choose us view succesfully",
    titledata
   })
}

export let titledata = async(req ,res)=>{

  let {id}=req.params
  // let {hello}=req.body;

  let titleupdatedata = await WhyChooseUsModel.findOne({_id:id})

 res.send({
  status:1,
  massage:"title row data",
  titleupdatedata
 })

}

export let titleUpdate = async(req ,res)=>{

  try {
    
    let {id}= req.params
   let {titleName,Order,discription}=req.body
    console.log(id)
    console.log(req.body)
    let obj={
      titleName,
      Order,
      discription
    }
  
    let updatedata = await WhyChooseUsModel.updateOne({_id:id}, {$set:obj})
  res.send({
    status:1,
    massage:"why choose us data update",
    updatedata
  })
  } catch (error) {
     res.send({
    status:0,
    massage:"why choose us data update error",
    error
  })
  }
}

export const titledelete = async (req, res) => {
  try {
    console.log("BODY RECEIVED:", req.body);   // important check

    const ids = req.body.ids; // must match 'ids'

    if (!ids || ids.length === 0) {
      return res.status(400).json({ message: "No IDs provided" });
    }

    await WhyChooseUsModel.deleteMany({ _id: { $in: ids } });

    res.json({ status: 1, message: "Deleted successfully" });

  } catch (error) {
    console.log("DELETE ERROR:", error);
    res.status(400).json({ error });
  }
};