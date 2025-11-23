import materialmodel from "../../MODELS/meterialmodel.js"



export let insertmaterial = async (req, res) => {
    try {
        let { materialName, materialOrder } = req.body
        console.log(req.body)

        let obj = {
            materialName,
            materialOrder
        }
        let materials = await materialmodel(obj)
        let materialres = await materials.save()

        res.send({
            status: 200,
            massage: "material save succesfully",
            materialres
        })

    } catch (error) {
        res.send({
            status: 400,
            massage: "material saveing error"
        })
    }
}



export let viewmaterial = async (req, res) => {

    try {
        let material = await materialmodel.find()

        res.send({
            status: 200,
            massage: "material view succesfully",
            material
        })
    } catch (error) {
        res.send({
            status: 400,
            massage: "material view error",

        })
    }
}

export let deletematerial = async (req, res) => {
    try {
        let ids = req.body.ids
    let deletematerialres = await materialmodel.deleteMany({ _id: { $in: ids } })

    res.send({
        status: 200,
        msg: "delete material",
        deletematerialres
    })
    } catch (error) {
        res.send({
            status: 400,
            massage: "material delete error",

        })
    }
}

