import slidermodel from "../../MODELS/slidermodel.js";

export let sliderinsert = async (req, res) => {
    try {
        console.log(req.body)

        let { sliderName, sliderOrder } = req.body;
        let obj = { sliderName, sliderOrder }

        let sliderdatacreated = await slidermodel(obj)
        let sliderRes = await sliderdatacreated.save()

        res.send({
            status: 1,
            massage: "slider data inserted",
            sliderRes
        })

    } catch (error) {
        res.send({
            status: 1,
            massage: "slider data inserted error",
            error
        })
    }
}


export let sliderview = async (req, res) => {


    let sliderdataview = await slidermodel.find()


     res.send({
            status: 1,
            massage: "slider data view inserted",
            sliderdataview
        })


}