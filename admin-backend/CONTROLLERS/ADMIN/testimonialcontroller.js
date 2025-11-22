import testimonialmodel from "../../MODELS/testimonialmodel.js"

export let testimonialinsert = async (req, res) => {
    try {
        console.log(req.body)
        console.log(req.file)
        let { testiName, Designation, Rating, Order, Message } = req.body

        let obj = { testiName, Designation, Rating, Order, Message }


        let testimonialdata = await testimonialmodel(obj)
        let testimonialres = testimonialdata.save()

        res.send({
            status: 1,
            massage: "testimonial insert",
            testimonialres
        })
    } catch (error) {

        res.send({
            status: 0,
            massage: "testimonial insert error",
            error
        })
    }
}

export let testimonialview = async (req, res) => {

    try {
        let testimonialdata = await testimonialmodel.find()

        res.send({
            status: 1,
            massage: "testimonial data view",
            testimonialdata
        })
    } catch (error) {
        res.send({
            status: 0,
            massage: "testimonial data view error",
            error
        })
    }
}

export let testimonialdelete = async(req ,res)=>{
   try {
     let {id} =req.body
    console.log("delte idsss",id)

    let deeletedata = await testimonialmodel.deleteMany({_id:id})
    res.send({
        status:1,
        massage:"testimonial delete",
        deeletedata
    })
   } catch (error) {
     res.send({
        status:0,
        massage:"testimonial delete error",
       error
    })
   }

   
}


export let changeStatus = async (req ,res)=>{
    let {id}=req.params
    console.log(id)
    let {state}=req.body
    console.log(state)

    let statusdata = await testimonialmodel.updateOne({_id:id},{
        testistatus:state
    })
   res.send({
        status:1,
        massage:"testimonial status-change successfully",
        statusdata
    })
}