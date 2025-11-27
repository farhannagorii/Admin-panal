import React, { useEffect, useState } from "react";
import $ from "jquery";
import "dropify/dist/css/dropify.min.css";
import "dropify/dist/js/dropify.min.js";
import Breadcrumb from "../../common/Breadcrumb";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { apiBaseUrl } from "../../Config";

export default function AddSubSubCategory() {
let [parentCategory, setParentCategory] = useState([])
let [subparentCategory, setsubParentCategory] = useState([])
let [subsubparentCategory, setsubsubParentCategory] = useState([])
let navigater = useNavigate()

   let getParentCategory = () => {
    axios.get(`${apiBaseUrl}/subsubcategory/parent-category`)
      .then((res) => res.data)
      .then((finalRes) => {
        setParentCategory(finalRes.categoryList)
        console.log(finalRes.categoryList)
      })
  }


  useEffect(() => {
    getParentCategory()
  }, [])

   let getsubParentCategory = (pid) => {
    axios.get(`${apiBaseUrl}/subsubcategory/subparent-category/${pid}`)
      .then((res) => res.data)
      .then((finalRes) => {
        setsubParentCategory(finalRes.subcategory)
        console.log(finalRes.subcategory)
      })
  }

  // useEffect(() => {
  //   getsubParentCategory()
  // }, [])

  let insertsubsubParentCategory = (e) => {
    e.preventDefault()
    let mydata = new FormData(e.target)
    axios.post(`${apiBaseUrl}/subsubcategory/insert`,mydata)
      .then((res) =>{
             navigater("/category/sub-sub-category/view")
        console.log(res.data)
      })
     
  }



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
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    
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
    <section className="w-[900] ml-14">
      <Breadcrumb path={"Sub Category"} path2={"Add Sub Category"} slash={"/"} />
      <div className="w-full min-h-[610px]">
        <div className="max-w-[950px] mx-auto py-5">
          <h3 className="text-[26px] font-semibold bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
            Add Sub Category
          </h3>
          <form onSubmit={insertsubsubParentCategory} autoComplete="off" className="border border-t-0 p-3 rounded-b-md border-slate-400">
            <div className="flex gap-5">
              <div className="w-1/3">
                <label
                  htmlFor="categoryImage"
                  className="block  text-md font-medium text-gray-900"
                >
                  Category Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  // {...register("categoryImage", { required: "Category image is required" })}
                  id="categoryImage"
                  name="subsubcategoryimage"
                  className="dropify"
                  data-height="260"
                />
              
              </div>

              <div className="w-2/3">
                
                {/* Parent Category Dropdown */}
                <div className="mb-5">
                  <label className="block mb-5 text-md font-medium text-gray-900">
                    Parent Category Name
                  </label>
                  <select
                    onChange={(e)=>getsubParentCategory(e.target.value)}
                    name="parentcategory"
                    className="border-2 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  >
                    <option value="">Select Category</option>
                    {parentCategory.length > 0 ? (
                      parentCategory?.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.categoryName}
                        </option>
                      ))
                    ) : (
                      <option disabled>No Categories Found</option>
                    )}
                  </select>
                </div>
                {/* subParent Category Dropdown */}
                <div className="mb-5">
                  <label className="block mb-5 text-md font-medium text-gray-900">
                    Sub Category Name
                  </label>
                   <select
                   
                    name="subparentcategory"
                    className="border-2 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  > 
                    <option value="">Select Category</option>
                    {subparentCategory.length > 0 ? (
                      subparentCategory.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.subcategoryname}
                        </option>
                      ))
                    ) : (
                      <option disabled>No Categories Found</option>
                    )}
                  </select>
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="categoryName"
                    className="block  text-md font-medium text-gray-900"
                  >
                    Category Name
                  </label>
                  <input
                    type="text"
                    // {...register("categoryName", { required: "Category name is required" })}
                    id="categoryName"
                    name="subsubcategoryname"
                    className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                    placeholder="Category Name"
                  />
                  {errors.categoryName && <p className="text-red-500">{errors.categoryName.message}</p>}
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="order"
                    className="block  text-md font-medium text-gray-900"
                  >
                    Order
                  </label>
                  <input
                    type="number"
                    // {...register("order", { required: "Order is required" })}
                    id="order"
                    name="subsubcategoryorder"
                    className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                    placeholder="Order"
                  />
                  {errors.order && <p className="text-red-500">{errors.order.message}</p>}
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="focus:outline-none my-5 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              {updateIdState ? "Update Sub Category" : "Add Sub Category"}
            </button>
          </form>


        </div>
      </div>
    </section>
  );
}
