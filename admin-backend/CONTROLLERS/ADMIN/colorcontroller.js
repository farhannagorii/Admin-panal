import colorModel from "../../MODELS/colormodel.js";

export let insertcolor = async (req, res) => {

    try {
        const { colorName, colorCode, colorOrder } = req.body;

        let obj = {
            colorName,
            colorCode,
            colorOrder
        }

        let color = await colorModel(obj)
        let colorres = await color.save()

        res.status(200).json({ massage: "color inserted successfully.", colorres })
    } catch (error) {
        res.status(400).json({ massage: "color inserted error.", error })
    }

};


export let viewcolor = async (req, res) => {


    try {

        let searchobj = {}
        let title = req.query.title;
           
        if(title){
            searchobj={
                $or:[{colorName:new RegExp(title ,"i")},{colorCode:new RegExp(title ,"i")}]
            }
        }


        let colorList = await colorModel.find(searchobj)

        res.send({
            status: 1,
            massage: "color is view",
            colorList
        })

    } catch (error) {
        res.status(400).json({ massage: "color view error.", error })
    }
}

export let deletecolor = async (req, res) => {


    let ids = req.body.ids;

    let deleteres = await colorModel.deleteMany({ _id: { $in: ids } })

    res.send({
        status: 1,
        msg: "delete color",
        deleteres,
    })


}

