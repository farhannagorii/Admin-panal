import React, { useEffect, useState } from "react";
import $ from "jquery";
import "dropify/dist/css/dropify.min.css";
import "dropify/dist/js/dropify.min.js";
import Breadcrumb from "../../common/Breadcrumb";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { apiBaseUrl } from "../../Config";
import e from "cors";

export default function AddSubCategory() {

  let [parentCategory, setParentCategory] = useState([])
const [selectedParent, setSelectedParent] = useState("");
  let navigate = useNavigate()

  let getParentCategory = () => {
    axios.get(`${apiBaseUrl}/subcategory/parent-category`)
      .then((res) => res.data)
      .then((finalRes) => {
        setParentCategory(finalRes.categoryList)
        console.log(finalRes.categoryList)
      })
  }
  useEffect(() => {
    getParentCategory()
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



  let saveCategory = (event) => {
    event.preventDefault()
    let myData = new FormData(event.target)


    axios.post(`${apiBaseUrl}/subcategory/insert`, myData)
      .then((res) => {
        if (res.data.status) {
          navigate("/category/sub-category/view")
          setImagePre(imagePre)
        }
        else if (res.data.error.code == 11000) {
          alert(res.data.msg)
        }

      })



  }
  return (
    <section className="w-full">
      <Breadcrumb path={"Sub Category"} link={'/category/sub-category/view'} path2={"Add"} slash={"/"} />
      <div className="w-full min-h-[610px]">
        <div className="max-w-[1220px] mx-auto py-5">
          <h3 className="text-[26px] font-semibold bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
            Add Sub Category
          </h3>
          <form onSubmit={saveCategory} autoComplete="off" className="border border-t-0 p-3 rounded-b-md border-slate-400">
            <div className="flex gap-5">
              <div className="w-1/3">
                <label
                  htmlFor="subcategoryImage"
                  className="block  text-md font-medium text-gray-900"
                >
                  Category Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  name="subcategoryImage"
                  id="subcategoryImage"
                  className="dropify"
                  data-height="230"
                />

              </div>

              <div className="w-2/3">
                {/* Parent Category Dropdown */}
                {/* <div className="mb-5">
                  <label className="block  text-md font-medium text-gray-900">
                    Parent Category Name
                  </label>
                  <select
                    onChange={(e) => setParentCategory(e.target.value)}
                    name="parantcategory"
                    className="border-2 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  >
                    <option value="">Select Category</option>
                    {parentCategory?.map ? (
                      parentCategory.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.categoryName}
                        </option>
                      ))
                    ) : (
                      <option disabled>No Categories Available</option>
                    )}


                  </select>
                </div> */}
                <div className="mb-5">
                  <label className="block mb-5 text-md font-medium text-gray-900">
                    Parent Category Name
                  </label>
                  <select
                    name="parentcategory"
                    // value={selectedParent}
                    // onChange={(e) => setSelectedParent(e.target.value)}
                    className="border-2 border-gray-300 ..."
                  >
                    <option value="">Select Category</option>
                    {parentCategory.length > 0 ? (
                      parentCategory.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.categoryName}
                        </option>
                      ))
                    ) : (
                      <option disabled>No Categories Found</option>
                    )}
                  </select>
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="subcategoryname"
                    className="block  text-md font-medium text-gray-900"
                  >
                    Category Name
                  </label>
                  <input
                    type="text"
                    id="subcategoryname"
                    name="subcategoryname"
                    className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                    placeholder="Category Name"
                  />
                  {/* {errors.categoryName && <p className="text-red-500">{errors.categoryName.message}</p>} */}
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="subcategoryname"
                    className="block  text-md font-medium text-gray-900"
                  >
                    Order
                  </label>
                  <input
                    type="text"

                    id="subcategoryorder"
                    name="subcategoryorder"
                    className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                    placeholder="Category Order"
                  />

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
