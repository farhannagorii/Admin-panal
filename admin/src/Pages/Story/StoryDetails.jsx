
import React, { useEffect, useState } from "react";
import { Form, useForm } from "react-hook-form";
import Breadcrumb from "../../common/Breadcrumb";
import $ from "jquery";
import "dropify/dist/css/dropify.min.css";
import "dropify/dist/js/dropify.min.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { apiBaseUrl } from "../../Config";

export default function StoryDetails() {
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



  const [titlename, settitlename] = useState("")
  const [titileorder, settitleorder] = useState("")
  const [discription, settitlediscription] = useState("")


  let { id } = useParams()
  let navigate = useNavigate()

  // let WhyChooseUshandler = (e) => {
  //   e.preventDefault()

  //   let myData = new FormData(e.target)
  //   myData.append("titleName", titlename);
  //   myData.append("Order", titileorder);
  //   myData.append("discription", discription);

  //   if (id) {
  //     axios.post(`${apiBaseUrl}/story-detail/update/${id}`, myData)
  //       .then((res) => {
  //         // navigate("/why-choose-us/view")
  //         alert("update data")
  //       })
  //   }
  //   else {
  //     axios.post(`${apiBaseUrl}/story-detail/insert`, myData)
  //       .then((res) => {
  //         navigate("/why-choose-us/view")
  //       })
  //   }
  // }

  let saveCategory = (event) => {
    event.preventDefault()
    let myData = new FormData(event.target)
    console.log(myData)
    if (id) {
      //Update
      axios.put(`${apiBaseUrl}/story-detail/update/${id}`, myData)
        .then((res) => {
          if (res.data.status) {
            navigate("/why-choose-us/view")
          }
        })
    }
    else {
      axios.post(`${apiBaseUrl}/story-detail/insert`, myData)
        .then((res) => {
          if (res.data.status) {
            navigate("/why-choose-us/view")
            alert("data save")
          }
          else if (res.data.error.code == 11000) {
            alert(res.data.msg)
            console.log(res.data.error.code)
          }

        })
    }

  }

  useEffect(() => {
    if (id) {
      axios.get(`${apiBaseUrl}/story-detail/title-data/${id}`)
        .then((res) => res.data)
        .then((finalres) => {
          console.log("title data", finalres.titleupdatedata)
          settitlename(finalres.titleupdatedata.titleName)
          settitleorder(finalres.titleupdatedata.Order)
          settitlediscription(finalres.titleupdatedata.discription)


        })
    }

    else {
      // settitlename('')
      // settitleorder('')
      // setImagePre('https://upload.wikimedia.org/wikipedia/commons/e/ea/No_image_preview.png')
    }

  }, [id])




  return (
    <section className="w-full">
      <nav className="flex border-b-2" aria-label="Breadcrumb">
        <ol className="p-3 px-6 inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center ">
            <Link href={"/home"} className="inline-flex items-center text-md font-medium text-gray-700 hover:text-blue-600">
              Home
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              /
              <Link to={"/why-choose-us/view"} className="ms-1 text-md font-medium text-gray-700 hover:text-blue-600 md:ms-2">Why Choose Us</Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              {/* / {updateIdState ? "Update" : "Add"} */}
              "add"
            </div>
          </li>
        </ol>
      </nav>
      {/* <Breadcrumb path={"Why Choose Us"} path2={updateIdState ? "Update" : "Add"} link={"/why-choose-us/view"} slash={"/"} /> */}

      <div className="w-full min-h-[610px]">
        <div className="max-w-[1220px] mx-auto py-5">
          <h3 className="text-[26px] font-semibold bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
            {/* {updateIdState ? "Update Why Choose Us" : "Add Why Choose Us"}
             */}
            "Add Why Choose Us"
          </h3>
          <form onSubmit={saveCategory} autoComplete="off" className="border border-t-0 p-3 rounded-b-md border-slate-400">
            <div className="flex gap-5">
              <div className="w-1/3">
                <label

                  className="block mb-0 text-md font-medium text-gray-900"
                >
                  Choose Image
                </label>
                <input
                  type="file"
                  // {...register("Image", { required: "image is required" })}
                  id="Image"
                  // name="titleImage"
                  className="dropify"
                  data-height="250"
                />
                {/* {errors.Image && <p className="text-red-500">{errors.Image.message}</p>} */}
              </div>
              <div className="w-2/3">
                <div className="mb-5">
                  <label
                    htmlFor="Title"
                    className="block  text-md font-medium text-gray-900"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    // {...register("Title", { required: "Title is required" })}
                    id="Title"
                    name="titleName"
                    value={titlename}
                    onChange={(e) => settitlename(e.target.value)}
                    className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                    placeholder="Title"
                  />
                  {/* {errors.Title && <p className="text-red-500">{errors.Title.message}</p>} */}
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="order"
                    className="block mb-0 text-md font-medium text-gray-900"
                  >
                    Order
                  </label>
                  <input
                    type="number"
                    // {...register("order", { required: "Order is required" })}
                    id="order"
                    name="Order"
                    value={titileorder}
                    onChange={(e) => settitleorder(e.target.value)}
                    className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                    placeholder="Order"
                  />
                  {/* {errors.order && <p className="text-red-500">{errors.order.message}</p>} */}
                </div>


                <div className="mb-5">
                  <label
                    htmlFor="Description"
                    className="block mb-0 text-md font-medium text-gray-900"
                  >
                    Description
                  </label>
                  <textarea
                    // {...register("Description", { required: "Description is required" })}
                    id="Description"
                    name="discription"
                    value={discription}
                    onChange={(e) => settitlediscription(e.target.value)}
                    className="text-[19px] resize-none h-[100px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                    placeholder="Description"
                  > </textarea>
                  {/* {errors.Description && <p className="text-red-500">{errors.Description.message}</p>} */}
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="focus:outline-none my-5 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              {/* {updateIdState ? "Update Category" : "Add Category"} */}
              "Add Category"
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
