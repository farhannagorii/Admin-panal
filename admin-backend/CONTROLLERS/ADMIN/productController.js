import categoryModel from "../../MODELS/categoryModel.js"
import colorModel from "../../MODELS/colormodel.js"
import materialmodel from "../../MODELS/meterialmodel.js"
import subcategoryModel from "../../MODELS/subcategorymodel.js"
import subsubcategoryModel from "../../MODELS/subSubcategorymodel.js"


export let getparentcategory = async (req, res) => {
    try {

        let categoryList = await categoryModel.find({ categoryStatus: true })

        res.send({
            status: 1,
            massage: "parent category",
            categoryList
        })
    } catch (error) {
        res.send({
            status: 0,
            massage: "parent category error",
            error
        })
    }
}

export let getsubcategory = async(req ,res)=>{
    try {
        let {pid}=req.params
        let categoryLists = await subcategoryModel.find({subcategorystatus:true, parentcategory:pid}).select("subcategoryname")

        res.send({
            status: 1,
            massage: "get subparent-category data",
            categoryLists
        })
    } catch (error) {
         res.send({
            status: 0,
            massage: "get subparent-category data",
            error
        })
    }
    }


export let getsubsubcategory = async (req, res) => {
    try {
        let { id } = req.params
        console.log(id)
        let subsubcategoryLists = await subsubcategoryModel.find({
            subsubcategorystatus: true,
            subparentcategory: id
        }).populate(["parentcategory","subparentcategory"])

        res.send({
            status: 1,
            massage: "get subsubparent-category data",
            subsubcategoryLists
        })
    } catch (error) {
        res.send({
            status: 0,
            massage: "get subsubparent-category data error",
            error
        })
    }
}

export let getcolor =async(req,res)=>{
    try {
        let colordata = await colorModel.find()
        res.send({
            status: 1,
            massage: "get color data",
            colordata
        })
    } catch (error) {
        res.send({
            status: 0,
            massage: "get color data error",
            error
        })
    }
}


export let meterial=async(req,res)=>{
       try {
        let materialdata = await materialmodel.find()
        res.send({
            status: 1,
            massage: "get meterial data",
            materialdata
        })
    } catch (error) {
        res.send({
            status: 0,
            massage: "get meterial data error",
            error
        })
    }
}



export let productinsert=async(req,res)=>{
    console.log(req.body)
    res.send("product api")
}