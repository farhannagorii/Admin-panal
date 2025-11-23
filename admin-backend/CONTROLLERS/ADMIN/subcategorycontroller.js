import categoryModel from "../../MODELS/categoryModel.js"
import subcategoryModel from "../../MODELS/subcategorymodel.js"

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

export let insertsubcategory = async (req, res) => {
    try {
        let { parentcategory, subcategoryimage, subcategoryname, subcategoryorder } = req.body;
        // console.log(req.body)
        // console.log(req.file)
        let obj = {
            subcategoryimage,
            subcategoryname,
            subcategoryorder,
            parentcategory,
            subcategorystatus:true
        }
        // console.log(obj)
        let subcategorydata = await subcategoryModel(obj)
        let subcategoryres = await subcategorydata.save()
        res.send({
            status: 1,
            massage: "subcategory insert succesfully",
            subcategoryres
        })

    } catch (error) {
        res.send({
            status: 0,
            massage: "subcategory insert error",
            error
        })
    }
}



export let getsubcategory = async (req, res) => {

    try {
        let subcatdata = await subcategoryModel.find().populate("parentcategory")
        res.send({
            status: 1,
            massage: "subcategory view succesfully",
            subcatdata
        })
    } catch (error) {
        res.send({
            status: 0,
            massage: "subcategory insert error",
            error
        })
    }
}


// export let updatestatus = async (req, res) => {



//     res.send("update api")
// }

export let deletecatdata = async (req, res) => {
    let id = req.body.ids
    // console.log(id)
    let detcatdata = await subcategoryModel.deleteMany({ _id: { $in: id } })
    res.send({
        status: 1,
        massage: "delete subcategory data",
        detcatdata
    })
}


export let updatestatus = async (req, res) => {
  try {
    let { id } = req.params;
    let { status } = req.body;

    let updatecat = await subcategoryModel.updateOne(
      { _id: id },
      {
        $set: {
          subcategorystatus: status  // FIXED
        }
      }
    );

    res.send({
      status: 1,
      massage: "update data of sub category",
      updatecat,
    });
  } catch (error) {
    res.send({
      status: 0,
      massage: "update data error",
    });
  }
};

// export let updateeditdata = (req, res)=>{
//     res.send("helooooo jiii")
// }