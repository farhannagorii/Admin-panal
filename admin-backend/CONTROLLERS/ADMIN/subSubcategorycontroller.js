import categoryModel from "../../MODELS/categoryModel.js"
import subcategoryModel from "../../MODELS/subcategorymodel.js"
import subsubcategoryModel from "../../MODELS/subSubcategorymodel.js"

export let getparentcategory = async (req, res) => {


    try {
        let categoryList = await categoryModel.find({ categoryStatus: true })


        res.send({
            status: 1,
            massage: "get parent-category data",
            categoryList
        })
    } catch (error) {
        res.send({
            status: 0,
            massage: "get parent-category data error",
            error
        })
    }
}

export let getsubcategorydata = async (req, res) => {
    try {
        let { pid } = req.params;
        let subcategory = await subcategoryModel.find({ subcategorystatus: true, parentcategory: pid }).select("subcategoryname")
        res.send({
            status: 1,
            massage: "get subparent-category data",
            subcategory
        })

    } catch (error) {
        res.send({
            status: 0,
            massage: "get subparent-category data",
            error
        })
    }

}

export let insertsubsubcat = async (req, res) => {

    try {
        let { parentcategory, subparentcategory, subsubcategoryname, subsubcategoryorder, subsubcategoryimage } = req.body
        console.log(req.body)


        let obj = {
            parentcategory,
            subparentcategory,
            subsubcategoryname,
            subsubcategoryorder,
            subsubcategoryimage
        }

        let subsubcatdata = await subsubcategoryModel(obj)
        let subsubdata = await subsubcatdata.save()

        res.send({
            status: 1,
            massage: "subsubcategory data insert",
            subsubdata
        })
    } catch (error) {
        res.send({
            status: 0,
            massage: "subsubcategory data insert error",
            error
        })
    }
}

export let viewsubsubdata = async (req, res) => {
    try {
        let subsubcatdata = await subsubcategoryModel.find()
            .populate({ path: "parentcategory", select: "categoryName" })
            .populate("subparentcategory");
            // .populate({ path: "subparentcategory", select: "subcategoryname" });

        res.send({
            status: 1,
            massage: "subsubcategory data view",
            subsubcatdata
        })

    } catch (error) {

        res.send({
            status: 0,
            massage: "subsubcategory data view error",
            error
        })
    }

}


export let deletecatedata = async (req, res) => {
    try {
        let { ids } = req.body;

        let deldata = await subsubcategoryModel.deleteMany({ _id: { $in: ids } })

        res.send({
            status: 1,
            massage: "delete data",
            deldata
        })
    } catch (error) {
        res.send({
            status: 0,
            massage: "delete data error",
            error
        })
    }
}

export let updatestatus = async (req, res) => {
    try {
        let { id } = req.params;
        let { status } = req.body;

        let updated = await subsubcategoryModel.findByIdAndUpdate(
            id,
            { subsubcategorystatus: status },
            { new: true }
        );

        res.send({
            status: 1,
            massage: "update data of sub category",
            updated,
        });
    } catch (error) {
        res.send({
            status: 0,
            massage: "update data error",
        });
    }
}