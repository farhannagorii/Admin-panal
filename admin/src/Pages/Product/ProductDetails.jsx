import React, { useEffect, useState } from 'react'
import $, { param } from "jquery";
import "dropify/dist/css/dropify.min.css";
import "dropify/dist/js/dropify.min.js";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { apiBaseUrl } from '../../Config';

export default function ProductDetails() {

  const [parentcategorydata, setparentcategorydata] = useState([])
  const [subparentcategorydata, setsubparentcategorydata] = useState([])
  const [subsubparentcategorydata, setsubsubparentcategorydata] = useState([])
  const [material, setmaterial] = useState([])
  const [colordata, setcolor] = useState([])


  let getparenttdata = () => {
    axios.get(`${apiBaseUrl}/products/parentcategory`)
      .then((res) => res.data)
      .then((final) => {
        setparentcategorydata(final.categoryList)
        // console.log(final.categoryList)
      })
  }
  useEffect(() => {
    getparenttdata()
  }, [])

  let getsubparentdata = (pid) => {
    axios.get(`${apiBaseUrl}/products/subcategory/${pid}`)
      .then((res) => res.data)
      .then((final) => {
        setsubparentcategorydata(final.categoryLists)
        console.log(final.categoryLists)
        // alert("yes")
      })
  }

  let getsubsubparentdata = (id) => {
    axios.get(`${apiBaseUrl}/products/subsubparentcategory/${id}`)
      .then((res) => res.data)
      .then((final) => {
        setsubsubparentcategorydata(final.subsubcategoryLists)
        console.log(final.subsubcategoryLists)
      })
  }
  let getmaterialdata = () => {
    axios.get(`${apiBaseUrl}/products/material`)
      .then((res) => res.data)
      .then((final) => {
        setmaterial(final.materialdata)
        console.log(final.materialdata)
        // alert("yes")
      })
  }
  let getcolor = () => {
    axios.get(`${apiBaseUrl}/products/color`)
      .then((res) => res.data)
      .then((final) => {
        setcolor(final.colordata)
        console.log(final.colordata)
        // alert("yes")
      })
  }
  let insert = (e) => {
    e.preventDefault()
    let formdata = new FormData(e.target)
    axios.post(`${apiBaseUrl}/products/insert`,formdata)
      .then((res) => res.data)
      .then((final) => {

        console.log(final.data)
        // alert("yes")
      })
  }

  useEffect(() => {
    getmaterialdata()
  }, [])
  useEffect(() => {
    getcolor()
  }, [])



  useEffect(() => {
    $(".dropify").dropify({
      messages: {
        default: "Drag and drop ",
        replace: "Drag and drop ",
        remove: "Remove",
        error: "Oops, something went wrong"
      }
    });
  }, []);

  const [value, setValue] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    // alert("Product Created Successfully!");
  };
  // update work
  const [updateIdState, setUpdateIdState] = useState(false)
  let updateId = useParams().id
  useEffect(() => {
    if (updateId == undefined) {
      setUpdateIdState(false)
    }
    else {
      setUpdateIdState(true)
    }
  }, [updateId])



  return (
    <section className="w-full">

      <nav className="flex border-b-2" aria-label="Breadcrumb">
        <ol className="p-3 px-6 inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center ">
            <Link to={"/home"} className="inline-flex items-center text-md font-medium text-gray-700 hover:text-blue-600">
              Home
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              /
              <Link to={"/product/view"} className="ms-1 text-md font-medium text-gray-700 hover:text-blue-600 md:ms-2">Product</Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              /
              <span className="ms-1 text-md font-medium text-gray-500 md:ms-2">{updateIdState ? "Update" : "Add"}</span>
            </div>
          </li>
        </ol>
      </nav>



      <div className='w-full px-6 py-6  '>

        <form onSubmit={insert}>
          <div className="grid grid-cols-3 gap-[10px] ">
            {/* for left */}
            <div className="for-images ">

              <div className="">
                <label
                  htmlFor="ProductImage"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Product Image
                </label>
                <input
                  name='productImage'
                  type="file"
                  id="ProductImage"
                  className="dropify"
                  data-height="160"
                // {...register("productImage", { required: "Product Image is required" })}
                />
                {errors.productImage && <p className="text-red-500 text-sm">{errors.productImage.message}</p>}


              </div>

              <div className="">
                <label
                  htmlFor="backImage"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Back Image
                </label>
                <input
                  name='backImage'
                  type="file"
                  id="backImage"
                  className="dropify"
                  data-height="160"
                // {...register("backImage", { required: "Back Image is required" })}
                />
                {errors.backImage && <p className="text-red-500 text-sm">{errors.backImage.message}</p>}
              </div>

              <div className="">
                <label
                  htmlFor="GalleryImage"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Gallery Image
                </label>
                <input
                  name='GalleryImage'
                  type="file"
                  id="GalleryImage"
                  className="dropify"
                  data-height="160"
                // {...register("GalleryImage", { required: "Gallery Image is required" })}
                />
                {errors.GalleryImage && <p className="text-red-500 text-sm">{errors.GalleryImage.message}</p>}
              </div>
            </div>

            {/* for midd */}
            <div className="middle">

              <div className="mb-5">
                <label
                  htmlFor="Prodct_Name"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Prodct Name
                </label>
                <input
                  name='Prodct_Name'
                  type="text"
                  className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                  placeholder='Prodct Name'
                // {...register("Prodct_Name", { required: "Prodct Name is required" })}
                />
                {errors.Prodct_Name && <p className="text-red-500 text-sm">{errors.Prodct_Name.message}</p>}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Select Sub Category
                </label>
                <select
                  onChange={(e) => getsubsubparentdata(e.target.value)}
                  name='Sub_Category'

                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3">
                  <option value="">Select Category</option>
                  {
                    subparentcategorydata.map((items, index) => {
                      return (
                        <option key={items._id} value={items._id}>{items.subcategoryname}</option>
                      )
                    })


                  }
                </select>
                {errors.Sub_Category && <p className="text-red-500 text-sm">{errors.Sub_Category.message}</p>}

              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Select Meterial
                </label>
                <select
                  name='Meterial'
                  // {...register("Meterial", { required: "Meterial is required" })}
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3">
                  <option value="">Nothing Selected</option>
                  {material.map((item) => {
                    return (<option value={item._id}>{item.materialName}</option>
                    )
                  })}

                </select>
                {errors.Meterial && <p className="text-red-500 text-sm">{errors.Meterial.message}</p>}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Select Prodcut Type
                </label>
                <select
                  name='Prodcut_Type'
                  // {...register("Prodcut_Type", { required: "Prodcut Type is required" })}
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3">
                  <option value="">Nothing Selected</option>
                  <option value="">Featured</option>
                  <option value="">New Arrivals</option>
                  <option value="">Onsale</option>


                </select>
                {errors.Prodcut_Type && <p className="text-red-500 text-sm">{errors.Prodcut_Type.message}</p>}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Is Top Rated
                </label>
                <select
                  name='Rated'
                  // {...register("Rated", { required: "Top Rated is required" })}
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3">
                  <option value="">Nothing Selected</option>
                  <option value="">Yes</option>
                  <option value="">No</option>

                </select>
                {errors.Rated && <p className="text-red-500 text-sm">{errors.Rated.message}</p>}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Actual Price
                </label>
                <input
                  type="text"
                  name='Actual_Price'
                  // {...register("Actual_Price", { required: " Actual Price is required" })}
                  className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                  placeholder='Actual Price'
                />
                {errors.Actual_Price && <p className="text-red-500 text-sm">{errors.Actual_Price.message}</p>}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Total In Stocks
                </label>
                <input
                  type="text"
                  name='Stocks'
                  // {...register("Stocks", { required: "Stocks is required" })}
                  className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                  placeholder='Total In Stocks'
                />
                {errors.Stocks && <p className="text-red-500 text-sm">{errors.Stocks.message}</p>}
              </div>



            </div>

            {/* for right */}
            <div className="right-items">
              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Select Parent Category
                </label>
                <select
                  onChange={(e) => getsubparentdata(e.target.value)}
                  name='Parent_Category'
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3">
                  <option value="">Nothing Selected</option>
                  {parentcategorydata.length >= 0 ?
                    parentcategorydata.map((item) => {
                      return (<option value={item._id}>{item.categoryName}</option>)
                    })

                    :
                    "no data found"
                  }


                </select>
                {errors.Parent_Category && <p className="text-red-500 text-sm">{errors.Parent_Category.message}</p>}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Select Sub Sub Category
                </label>
                <select

                  name='Sub_Sub_Category'
                  // {...register("Sub_Sub_Category", { required: "Sub Sub Category is required" })}
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3">
                  <option value="">Nothing Selected</option>
                  {subsubparentcategorydata.length > 0 ?
                    subsubparentcategorydata.map((item) => {
                      return (<option value={item._id}>{item.subsubcategoryname}</option>)
                    })
                    :
                    "no data found"
                  }



                </select>
                {errors.Sub_Sub_Category && <p className="text-red-500 text-sm">{errors.Sub_Sub_Category.message}</p>}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Select Color
                </label>
                <select
                  name='Color'
                  // {...register("Color", { required: "Color is required" })}
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3">
                  <option value="">Nothing Selected</option>
                  {colordata.map((item) => {
                    return (<option value={item._id}>{item.colorName}</option>)
                  })}



                </select>
                {errors.Color && <p className="text-red-500 text-sm">{errors.Color.message}</p>}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Is Best Selling
                </label>
                <select
                  name='Selling'
                  // {...register("Selling", { required: " Best Selling is required" })}
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3">
                  <option value="">Nothing Selected</option>
                  <option value="">Yes</option>
                  <option value="">No</option>

                </select>
                {errors.Selling && <p className="text-red-500 text-sm">{errors.Selling.message}</p>}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Is Upsell
                </label>
                <select
                  name='Upsell'
                  // {...register("Upsell", { required: "Upsell is required" })}
                  className="text-[19px] text-[#76838f] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-2.5 px-3">
                  <option value="">Nothing Selected</option>
                  <option value="">Yes</option>
                  <option value="">No</option>

                </select>
                {errors.Upsell && <p className="text-red-500 text-sm">{errors.Upsell.message}</p>}
              </div>

              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Sale Price
                </label>
                <input
                  name='Sale_Price'
                  type="text"
                  className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                  placeholder=' Sale Price'
                // {...register("Sale_Price", { required: "Sale Price is required" })}
                />
                {errors.Sale_Price && <p className="text-red-500 text-sm">{errors.Sale_Price.message}</p>}
              </div>


              <div className="mb-5">
                <label
                  htmlFor="categoryName"
                  className="block  text-md font-medium text-gray-900 text-[#76838f]"
                >
                  Order
                </label>
                <input
                  name='Order'
                  type="text"
                  className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                  placeholder='Order'
                // {...register("Order", { required: " Order is required" })}
                />
                {errors.Order && <p className="text-red-500 text-sm">{errors.Order.message}</p>}
              </div>


            </div>
          </div>

          <div className='py-[40px]'>
            <label
              htmlFor="categoryImage"
              className="block  text-md font-medium text-gray-900 text-[#76838f]"
            >
              Description
            </label>
            <ReactQuill theme="snow" value={value} onChange={setValue} className='h-[200px]'
            // {...register("description", { required: "Description is required" })} 
            />

          </div>
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}

          <button class=" mt-5 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 ">
            {updateIdState ? "Update Product " : "Add Product"}
          </button>

        </form>

      </div>
    </section>
  )
}

